import Styles from './AccountItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image/index';
import { Link } from 'react-router-dom';
const cx = classNames.bind(Styles);

function AccountItem({ account, ...passProp }) {
    return (
        <Link
            to={`/@${account.nickname}`}
            className={cx('wrapper')}
            {...passProp}
        >
            <Image className={cx('avatar')} src={account.avatar} alt="" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{account.nickname}</span>
                    {account.tick && (
                        <FontAwesomeIcon
                            className={cx('check-icon')}
                            icon={faCheckCircle}
                        />
                    )}
                </h4>
                <p className={cx('user-name')}>{account.nickname}</p>
            </div>
        </Link>
    );
}

export default AccountItem;
