import jordan4_unc from '../assets/items/nike_jordan_4_university_blue.png';
import zebra from '../assets/items/adidas_yeezy_350_zebra.png';
import nike_off_white from '../assets/items/nike_off---white_dunk_low_lot_45.png';
import yeezy_slide from '../assets/items/adidas_yeezy_slides_core.png';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';

export const top_picks = [
  {
    id: 1,
    image: jordan4_unc,
    title: 'Jordan 4 Retro University Blue',
    rates: 4.2,
    price: 72,
  },
  {
    id: 2,
    image: zebra,
    title: 'Yeezy Zebra',
    rates: 4.9,
    price: 199,
  },
  {
    id: 3,
    image: nike_off_white,
    title: 'Nike Dunk Low Off White',
    rates: 5.0,
    price: 399,
  },
  {
    id: 4,
    image: yeezy_slide,
    title: 'Yeezy Slide Core',
    rates: 4.3,
    price: 129,
  },
];

export const sidebarLinks = [
  {
    id: 1,
    name: 'Profile',
    path: '/profile',
    icon: <PersonIcon />,
  },

  {
    id: 2,
    name: 'Shipping Address',
    path: '/shipping',
    icon: <LocalShippingIcon />,
  },
  {
    id: 3,
    name: 'Purchase History',
    path: '/history',
    icon: <HistoryIcon />,
  },
  {
    id: 4,
    name: 'Logout',
    path: '',
    icon: <PowerSettingsNewIcon />,
    handler: true,
  },
];

export const adminSidebarLinks = [
  {
    id: 1,
    name: 'New Item',
    path: '/new-item',
    icon: <AddIcon />,
  },

  {
    id: 2,
    name: 'Edit Item',
    path: '/edit-item',
    icon: <EditIcon />,
  },
  {
    id: 3,
    name: 'Back Home',
    path: '/',
    icon: <HomeIcon />,
  },
];
