<template>
  <div class="app-container">
    <h1>Requirements Voice Capture</h1>
    
    <div class="controls">
      <button @click="toggleRecording" :class="{ 'recording': isRecording }">
        {{ isRecording ? 'Stop Recording' : 'Start Recording' }}
      </button>
      <div class="status-indicator" :class="{ 'active': isRecording }"></div>
      <button @click="clearTranscript" class="clear-button">Clear Transcript</button>
    </div>
    
    <div class="recording-info" v-if="isRecording">
      <div class="recording-message">Recording... (Captures up to 30 seconds of audio at a time)</div>
      <div class="recording-timer">{{ Math.floor(recordingDuration / 1000) }} seconds</div>
    </div>
    
    <div class="transcript-container">
      <h3>Current Transcript</h3>
      <div class="transcript">{{ currentTranscript }}</div>
    </div>
    
    <div class="requirement-form" v-if="currentRequirement">
      <h3>Current Requirement <span class="requirement-count" v-if="pendingRequirements.length > 0">({{ pendingRequirements.length + 1 }} total)</span></h3>
      <div class="form-group">
        <label for="name">Requirement Name</label>
        <input id="name" v-model="currentRequirement.name" placeholder="Enter requirement name">
      </div>
      <div class="form-group">
        <label for="description">Requirement Description</label>
        <textarea id="description" v-model="currentRequirement.description" placeholder="Enter or verify the transcribed requirement description"></textarea>
      </div>
      <div class="navigation-buttons">
        <button @click="previousRequirement" class="nav-button" :disabled="navigationHistory.length === 0">
          <span class="arrow">←</span> Previous
        </button>
        <div class="action-buttons">
          <button @click="saveCurrentRequirement" :disabled="!currentRequirement.name || !currentRequirement.description" class="save-button">
            Save Requirement
          </button>
          <button @click="deleteCurrentRequirement" class="delete-button">
            Delete
          </button>
        </div>
        <button @click="nextRequirement" class="nav-button" :disabled="pendingRequirements.length === 0">
          Next <span class="arrow">→</span>
        </button>
      </div>
    </div>
    
    <div class="requirements-table">
      <h3>Requirements List</h3>
      <table>
        <thead>
          <tr>
            <th>Requirement Name</th>
            <th>Requirement Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(req, index) in savedRequirements" :key="index">
            <td>{{ req.name }}</td>
            <td>{{ req.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isRecording: false,
      recorder: null,
      audioContext: null,
      analyser: null,
      currentTranscript: '',
      pendingRequirements: [],
      currentRequirement: null,
      savedRequirements: [],
      refreshInterval: null,
      micStream: null,
      recordingStartTime: null,
      recordingChunks: [],
      processingAudio: false,
      apiBaseUrl: import.meta.env.VITE_API_URL || '', // Use environment variable
      recordingStartedAt: null,
      recordingDuration: 0,
      navigationHistory: [], // To store requirements for "previous" functionality
      timerInterval: null
    };
  },
  methods: {
    // API URL helper function
    getApiUrl() {
      // Use fixed base URL instead of env variables to avoid potential issues
      return this.apiBaseUrl;
    },
    
    async fetchRequirements() {
      try {
        const response = await fetch(`${this.getApiUrl()}/api/requirements`);
        if (response.ok) {
          this.savedRequirements = await response.json();
        }
      } catch (error) {
        console.error('Error fetching requirements:', error);
      }
    },
    
    async fetchTranscript() {
      try {
        const response = await fetch(`${this.getApiUrl()}/api/transcript`);
        if (response.ok) {
          const data = await response.json();
          this.currentTranscript = data.transcript;
        }
      } catch (error) {
        console.error('Error fetching transcript:', error);
      }
    },
    
    clearTranscript() {
      this.currentTranscript = '';
      
      fetch(`${this.getApiUrl()}/api/clear-transcript`, {
        method: 'POST'
      })
      .catch(error => {
        console.error('Error clearing transcript:', error);
        alert('Could not connect to the server. Please ensure the backend is running on port 3000.');
      });
    },
    
    toggleRecording() {
      if (this.isRecording) {
        this.stopRecording();
      } else {
        this.startRecording();
      }
    },
    
    async startRecording() {
      try {
        // Record start time for tracking recording duration
        this.recordingStartedAt = Date.now();
        this.recordingDuration = 0;
        
        // Start the timer to update the recording duration
        this.timerInterval = setInterval(() => {
          this.recordingDuration = Date.now() - this.recordingStartedAt;
        }, 100);
        
        // Request microphone access with optimized settings
        this.micStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            channelCount: 1,
            sampleRate: 48000,
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });
        
        // Set up MediaRecorder with specific MIME type
        const options = { mimeType: 'audio/webm;codecs=opus', audioBitsPerSecond: 128000 };
        this.recorder = new MediaRecorder(this.micStream, options);
        this.recordingChunks = [];
        
        // Handle data available event
        this.recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            console.log('Audio chunk received, size:', event.data.size);
            this.recordingChunks.push(event.data);
          }
        };
        
        // Use longer chunks to capture more speech
        this.recorder.start(5000); // 5-second chunks
        this.isRecording = true;
        
        // Process audio after 30 seconds of recording
        this.refreshInterval = setInterval(() => {
          const elapsedTime = Date.now() - this.recordingStartedAt;
          console.log(`Recording time: ${elapsedTime / 1000} seconds`);
          
          // Only process after accumulating at least 30 seconds of audio
          if (elapsedTime >= 30000 && this.recordingChunks.length > 0) {
            console.log('Processing 30 seconds of audio chunks:', this.recordingChunks.length);
            this.processAudioAndUpdateTranscript();
            // Reset the recording start time after processing
            this.recordingStartedAt = Date.now();
          }
        }, 5000); // Check every 5 seconds
        
        console.log('Recording started successfully');
      } catch (error) {
        console.error('Error starting recording:', error);
        alert('Could not access microphone. Please ensure you have granted permission.');
      }
    },
    
    async processAudioAndUpdateTranscript() {
      if (this.recordingChunks.length === 0) {
        console.log('No audio chunks to process');
        return;
      }
      
      if (this.processingAudio) {
        console.log('Already processing audio, skipping this batch');
        return;
      }
      
      console.log('Start processing audio chunks');
      this.processingAudio = true;
      
      try {
        // Get all current chunks and reset
        const chunks = [...this.recordingChunks];
        this.recordingChunks = [];
        
        // Create blob from chunks
        const blob = new Blob(chunks, { type: 'audio/webm;codecs=opus' });
        console.log('Audio blob created, size:', blob.size);
        
        // Skip tiny audio blobs that likely contain no speech
        if (blob.size < 1000) {
          console.log('Audio blob too small, skipping');
          this.processingAudio = false;
          return;
        }
        
        // Convert to base64
        const reader = new FileReader();
        
        reader.onloadend = async () => {
          const base64Audio = reader.result.split(',')[1];
          console.log('Audio converted to base64, length:', base64Audio.length);
          
          try {
            console.log('Sending audio to server for transcription');
            const response = await fetch(`${this.getApiUrl()}/api/transcribe`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ audioData: base64Audio })
            });
            
            if (response.ok) {
              const data = await response.json();
              console.log('Transcription received:', data);
              
              // Update transcript
              if (data.fullText) {
                this.currentTranscript = data.fullText;
              }
              
              // Process requirements
              if (data.requirements && data.requirements.length > 0) {
                console.log('Requirements detected:', data.requirements.length);
                // Handle any new requirements
                data.requirements.forEach(req => {
                  if (!this.isDuplicateRequirement(req)) {
                    this.pendingRequirements.push(req);
                  }
                });
                
                // Set current requirement if none is active
                if (!this.currentRequirement && this.pendingRequirements.length > 0) {
                  this.currentRequirement = this.pendingRequirements.shift();
                }
              }
            } else {
              const errorText = await response.text();
              console.error('Server returned an error:', errorText);
            }
          } catch (fetchError) {
            console.error('Network error when sending audio:', fetchError);
            alert('Could not connect to the server. Please make sure the backend is running on port 3000.');
          }
          
          this.processingAudio = false;
        };
        
        reader.onerror = (error) => {
          console.error('Error reading audio file:', error);
          this.processingAudio = false;
        };
        
        // Start reading the blob
        reader.readAsDataURL(blob);
        
      } catch (error) {
        console.error('Error processing audio:', error);
        this.processingAudio = false;
      }
    },
    
    isDuplicateRequirement(req) {
      // Check against current requirement
      if (this.currentRequirement && 
          this.similarText(this.currentRequirement.name, req.name) && 
          this.similarText(this.currentRequirement.description, req.description)) {
        return true;
      }
      
      // Check against pending requirements
      const pendingDuplicate = this.pendingRequirements.some(pendingReq => 
        this.similarText(pendingReq.name, req.name) && 
        this.similarText(pendingReq.description, req.description)
      );
      if (pendingDuplicate) return true;
      
      // Check against saved requirements
      const savedDuplicate = this.savedRequirements.some(savedReq => 
        this.similarText(savedReq.name, req.name) && 
        this.similarText(savedReq.description, req.description)
      );
      if (savedDuplicate) return true;
      
      return false;
    },
    
    similarText(str1, str2) {
      if (!str1 || !str2) return false;
      
      const a = str1.toLowerCase();
      const b = str2.toLowerCase();
      
      // Direct matches
      if (a === b || a.includes(b) || b.includes(a)) {
        return true;
      }
      
      // Check for word overlap
      const wordsA = a.split(/\s+/);
      const wordsB = b.split(/\s+/);
      
      let matches = 0;
      for (const word of wordsA) {
        if (word.length > 3 && wordsB.includes(word)) matches++;
      }
      
      // If 60% of significant words match
      return matches / Math.max(1, wordsA.length) > 0.6;
    },
    
    async saveCurrentRequirement() {
      if (!this.currentRequirement || !this.currentRequirement.name || !this.currentRequirement.description) {
        return;
      }
      
      try {
        const response = await fetch(`${this.getApiUrl()}/api/requirements`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: this.currentRequirement.name,
            description: this.currentRequirement.description
          })
        });
        
        if (response.ok) {
          const savedRequirement = await response.json();
          this.savedRequirements.push(savedRequirement);
          
          // Move to next requirement
          if (this.pendingRequirements.length > 0) {
            this.currentRequirement = this.pendingRequirements.shift();
            // Clear navigation history when moving to a new requirement after saving
            this.navigationHistory = [];
          } else {
            this.currentRequirement = null;
          }
        }
      } catch (error) {
        console.error('Error saving requirement:', error);
        alert('Could not save requirement. Please ensure the backend server is running.');
      }
    },
    
    deleteCurrentRequirement() {
      if (!this.currentRequirement) return;
      
      // Add current requirement to navigation history before removing it
      this.navigationHistory.push(this.currentRequirement);
      
      // Move to next requirement or clear current if none left
      if (this.pendingRequirements.length > 0) {
        this.currentRequirement = this.pendingRequirements.shift();
      } else {
        this.currentRequirement = null;
      }
    },
    
    previousRequirement() {
      if (this.navigationHistory.length === 0) return;
      
      // If there's a current requirement, push it back into the pending queue
      if (this.currentRequirement) {
        this.pendingRequirements.unshift(this.currentRequirement);
      }
      
      // Get the most recent requirement from history
      this.currentRequirement = this.navigationHistory.pop();
    },
    
    nextRequirement() {
      if (this.pendingRequirements.length === 0) return;
      
      // Add current requirement to navigation history
      if (this.currentRequirement) {
        this.navigationHistory.push(this.currentRequirement);
      }
      
      // Move to the next requirement
      this.currentRequirement = this.pendingRequirements.shift();
    },
    
    stopRecording() {
      if (this.recorder && this.recorder.state !== 'inactive') {
        this.recorder.stop();
      }
      
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval);
        this.refreshInterval = null;
      }
      
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
      
      // Process any remaining audio
      if (this.recordingChunks.length > 0) {
        this.processAudioAndUpdateTranscript();
      }
      
      // Stop microphone
      if (this.micStream) {
        this.micStream.getTracks().forEach(track => track.stop());
        this.micStream = null;
      }
      
      this.isRecording = false;
    },
    
    // Check server connectivity at startup
    async checkServerConnectivity() {
      try {
        const response = await fetch(`${this.getApiUrl()}/api/health`);
        if (response.ok) {
          console.log('Connected to backend server successfully');
        }
      } catch (error) {
        console.error('Backend server connectivity check failed:', error);
        alert('Could not connect to the backend server. Please ensure it is running on http://localhost:3000');
      }
    }
  },
  mounted() {
    // Check server connectivity
    this.checkServerConnectivity();
    
    // Load initial data
    this.fetchRequirements();
    this.fetchTranscript();
  },
  beforeUnmount() {
    this.stopRecording();
    
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }
};
</script>

<style>
.app-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button.recording {
  background-color: #f44336;
}

.clear-button {
  background-color: #f0ad4e;
}

.clear-button:hover {
  background-color: #ec971f;
}

.delete-button {
  background-color: #d9534f;
}

.delete-button:hover {
  background-color: #c9302c;
}

.save-button {
  background-color: #5cb85c;
}

.save-button:hover {
  background-color: #4cae4c;
}

.nav-button {
  background-color: #5bc0de;
  min-width: 100px;
}

.nav-button:hover:not(:disabled) {
  background-color: #46b8da;
}

.arrow {
  font-weight: bold;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.status-indicator {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #999;
  margin-left: 10px;
  margin-right: 10px;
}

.status-indicator.active {
  background-color: #f44336;
}

.recording-info {
  margin-bottom: 15px;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.recording-timer {
  font-weight: bold;
}

.transcript-container {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.transcript {
  min-height: 60px;
  font-size: 18px;
  white-space: pre-wrap;
}

.requirement-form {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.requirement-count {
  font-size: 0.8em;
  color: #666;
  font-weight: normal;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.requirements-table {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f8f8f8;
  font-weight: bold;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>