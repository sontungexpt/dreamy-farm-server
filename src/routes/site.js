import express from 'express';
import SiteController from '~/controllers/SiteController';
const router = express.Router();

const siteController = new SiteController();

router.use('/', siteController.index);
router.use('/search', siteController.search);

export default router;
