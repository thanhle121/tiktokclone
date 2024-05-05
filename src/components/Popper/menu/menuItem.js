import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data, onclick }) {
    const classes = cx('menu-item', {
        separate: data.separate,
    });
    const isHasIcon = !!data.icon;
    return (
        <Button
            className={classes}
            leftIcon={isHasIcon && <FontAwesomeIcon icon={data.icon} />}
            to={data.to}
            onClick={onclick}
        >
            {data.content}
        </Button>
    );
}

export default MenuItem;
