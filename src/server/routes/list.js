import list from '../controllers/list';
import { isAuthenticated } from '../lib/index';

export default router => {
    router.get('/list', list.load);
    router.post('/list', list.multerConfig, isAuthenticated,list.create);
    router.get('/list/song/:id', list.detail);
    router.post('/list/like/:id', isAuthenticated ,list.like);
    router.post('/comment', isAuthenticated ,list.createComment);
    router.post('/comment/like/:id', isAuthenticated ,list.likeComment);
};