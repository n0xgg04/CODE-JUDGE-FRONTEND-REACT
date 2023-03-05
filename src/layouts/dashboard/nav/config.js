// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Thử thách',
    path: '/dashboard/challenges',
    icon: icon('ic_game'),
  },
  {
    title: 'Bảng xếp hạng',
    path: '/dashboard/ranking',
    icon: icon('ic_ranking'),
  },
  {
    title: 'Bài đã nộp',
    path: '/dashboard/submissions',
    icon: icon('ic_submission'),
  },
  {
    title: 'Cuộc thi',
    path: '/dashboard/contests',
    icon: icon('ic_blog'),
  }
];

export default navConfig;
