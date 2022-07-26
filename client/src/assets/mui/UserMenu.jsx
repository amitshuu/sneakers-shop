import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLogout } from '../../utils/customHooks';

const UserMenu = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const { handleLogout } = useLogout();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        sx={{ color: 'var(--clr-mocha)' }}
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'false' : undefined}
        onClick={handleClick}
      >
        <PersonOutlineOutlinedIcon style={{ color: 'black' }} />
        {userInfo.username}
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link to='/profile'>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        {userInfo.isAdmin && (
          <Link to='/new-item'>
            <MenuItem onClick={handleClose}>Admin Panel</MenuItem>
          </Link>
        )}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
