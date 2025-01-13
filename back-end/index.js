// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

const HF_API_KEY = process.env.HF_API_KEY;
const VISION_MODEL = "microsoft/resnet-50";

// Test endpoint for image upload
app.post('/api/test-upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    
    // Return basic file information to confirm upload
    res.json({
      message: 'Image uploaded successfully',
      fileInfo: {
        filename: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  } catch (error) {
    console.error('Upload test error:', error);
    res.status(500).json({ error: 'Upload test failed', details: error.message });
  }
});

// Test HuggingFace API connection
app.get('/api/test-hf-connection', async (req, res) => {
  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${VISION_MODEL}`,
      {
        method: 'HEAD',
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`
        }
      }
    );
    
    if (response.ok) {
      res.json({ message: 'HuggingFace API connection successful' });
    } else {
      throw new Error(`API responded with status ${response.status}`);
    }
  } catch (error) {
    console.error('HuggingFace connection test error:', error);
    res.status(500).json({ error: 'HuggingFace API connection failed', details: error.message });
  }
});

// Analyze image with HuggingFace
app.post('/api/analyze-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imageBase64 = req.file.buffer.toString('base64');

    const response = await fetch(
      `https://api-inference.huggingface.co/models/${VISION_MODEL}`,
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          inputs: {
            image: imageBase64
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`HuggingFace API responded with status ${response.status}`);
    }

    const analysis = await response.json();
    
    res.json({
      message: 'Analysis completed successfully',
      analysis: analysis
    });
  } catch (error) {
    console.error('Image analysis error:', error);
    res.status(500).json({ error: 'Image analysis failed', details: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});