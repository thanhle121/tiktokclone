import Tippy from '@tippyjs/react/headless';
import styles from './menu.module.scss';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Header from './header';
import MenuItem from './menuItem';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Menu({ children, items = [], hideOnClick = false }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onclick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                            // setHistory(item.children);
                        } else {
                            console.log(item);
                        }
                    }}
                />
            );
        });
    };

    return (
        <Tippy
            interactive={true}
            delay={[0, 700]}
            placement={'top-end'}
            hideOnClick={hideOnClick}
            onHide={() => {
                setHistory((prev) => {
                    return prev.slice(0, 1);
                });
            }}
            render={(attrs) => (
                <div className={cx('menu-items')} tabIndex={-1} {...attrs}>
                    <PopperWrapper className={cx('menu-props')}>
                        {history.length > 1 && (
                            <Header
                                title={'Language'}
                                onBack={() => {
                                    setHistory((prev) =>
                                        prev.slice(0, prev.length - 1),
                                    );
                                }}
                            ></Header>
                        )}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
