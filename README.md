# AI Fashion Stylist

An AI-powered fashion analysis tool that helps users analyze their outfits and get personalized style recommendations.

## Features

- 🖼️ Image Upload & Analysis
- 🤖 AI-Powered Style Recognition
- 👕 Outfit Recommendations
- 🛍️ Shopping Suggestions
- ✨ Real-time Analysis
- 📱 Responsive Design

## Live Demo

[Add your deployed application URL here]

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Next.js
- Axios for API calls

### Backend
- Node.js
- Express.js
- HuggingFace API for image analysis
- Multer for file handling

## Project Structure

```
ai-fashion-stylist/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ImageAnalyzer.js
│   │   ├── styles/
│   │   │   └── globals.css
│   │   └── pages/
│   │       └── index.js
│   ├── public/
│   └── package.json
├── backend/
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- HuggingFace API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-fashion-stylist.git
cd ai-fashion-stylist
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Add your HuggingFace API key to .env file
```

4. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open http://localhost:3000 in your browser

## API Endpoints

- `POST /api/test-upload` - Test image upload functionality
- `GET /api/test-hf-connection` - Test HuggingFace API connection
- `POST /api/analyze-image` - Analyze uploaded image

## User Experience Features

1. **Intuitive Interface**
   - Clean, minimalist design
   - Clear upload instructions
   - Visual feedback for all actions

2. **Real-time Feedback**
   - Loading indicators
   - Progress bars for analysis
   - Clear error messages

3. **Responsive Design**
   - Works on desktop and mobile devices
   - Adaptive layout for different screen sizes

4. **Visual Results**
   - Confidence score visualization
   - Organized analysis results
   - Collapsible detailed information

## Testing

The application includes several test points:

1. **API Connection Testing**
   - Automatic API connection verification
   - Connection status display

2. **Image Upload Testing**
   - File type validation
   - Upload success verification
   - Error handling

3. **Analysis Testing**
   - Response validation
   - Error handling
   - Result parsing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- HuggingFace for providing the image analysis API
- React and Node.js communities for excellent documentation
- All contributors who help improve this project

## Contact

Manish Kottamgari - kottamgari.m@northeastern.edu
