import express from 'express'
import { generateArticle, generateBlogTitle, generateImage, changePlan } from '../controllers/aiController.js';
import { auth } from '../middlewares/auth.js';

const aiRouter = express.Router();

aiRouter.post('/generate-article', auth, generateArticle)
aiRouter.post('/generate-blog-title', auth, generateBlogTitle)
aiRouter.post('/generate-image', auth, generateImage)
aiRouter.post('/change-plan', auth, changePlan)

export default aiRouter