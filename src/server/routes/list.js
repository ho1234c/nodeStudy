import list from '../controllers/list';

export default router => {
    router.route('/list/load')
        .get(list.load);
};