import Styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDebounce } from '~/hooks';

import * as searchServices from '~/sevices/searchSevices';
import { Wrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import HeadLessTippy from '@tippyjs/react/headless';
import {
    faSpinner,
    faTimesCircle,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(Styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');

    const [searchResult, setSearchResult] = useState([]);

    const [showResult, setShowResult] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const debounceValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debounceValue.trim()) return setSearchResult([]);

        const fetchApi = async () => {
            setIsLoading(true);

            const result = await searchServices.search(debounceValue);
            setSearchResult(result);
            setIsLoading(false);
        };
        fetchApi();
    }, [debounceValue]);

    const inputElement = useRef();

    const handleClearResult = () => {
        setSearchValue('');
        setSearchResult([]);
        inputElement.current.focus();
    };

    const handleChange = (e) => {
        let valueInput = e.target.value;

        if (!valueInput.startsWith(' ')) setSearchValue(valueInput);
    };
    return (
        <div>
            <HeadLessTippy
                visible={showResult && searchResult.length > 0}
                interactive={true}
                onClickOutside={() => {
                    setShowResult(false);
                }}
                render={() => (
                    <div className={cx('search-result')} tabIndex={-1}>
                        <Wrapper>
                            <h4 className={cx('search-title')}>Tài Khoản</h4>
                            {searchResult.map((account, index) => {
                                return (
                                    <AccountItem
                                        key={index}
                                        account={account}
                                    />
                                );
                            })}
                        </Wrapper>
                    </div>
                )}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputElement}
                        value={searchValue}
                        placeholder={'Tìm kiếm tên tài khoản và video'}
                        className={cx('search-input')}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    ></input>
                    {!!searchValue ? (
                        <div className={cx('search-status')}>
                            {isLoading ? (
                                <FontAwesomeIcon
                                    className={cx('search-loading')}
                                    icon={faSpinner}
                                ></FontAwesomeIcon>
                            ) : (
                                <button
                                    className={cx('search-delete')}
                                    onClick={() => handleClearResult()}
                                >
                                    <FontAwesomeIcon
                                        icon={faTimesCircle}
                                    ></FontAwesomeIcon>
                                </button>
                            )}
                        </div>
                    ) : (
                        <></>
                    )}
                    <button
                        className={cx('search-btn')}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                        ></FontAwesomeIcon>
                    </button>
                </div>
            </HeadLessTippy>
        </div>
    );
}

export default Search;
