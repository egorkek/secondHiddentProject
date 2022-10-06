import React, { useState, useCallback } from 'react';
import throttle from 'lodash/throttle';

import { Grid } from '@vtblife/uikit';

import { StatusSelect } from './status-select';
import { SearchInput } from './search-input';

interface ISearchBarProps {
    defaultStatuses: string[];
    defaultSearchText?: string;
    onSubmitHandler: (searchText: string, status: Array<string>) => void;
}

export const SearchBar = (props: ISearchBarProps) => {
    const { defaultStatuses, defaultSearchText = '', onSubmitHandler } = props;
    const [statuses, setStatuses] = useState(defaultStatuses);
    const [searchText, setSearchText] = useState(defaultSearchText);

    const onSubmit = useCallback(
        (searchText: string, statuses: string[]) =>
            throttle(() => {
                onSubmitHandler(searchText, statuses);
            }, 1000),
        [onSubmitHandler],
    );
    const onSelectChange = (statuses: string[]) => {
        setStatuses(statuses);
        onSubmit(searchText, statuses);
    };
    const onInputChange = (searchedText: string) => {
        setSearchText(searchedText);
        onSubmit(searchText, statuses);
    };

    return (
        <Grid.Row>
            <Grid.Col xs={19}>
                <SearchInput value={searchText} onChange={onInputChange} />
            </Grid.Col>
            <Grid.Col xs={5}>
                <StatusSelect defaultStatuses={defaultStatuses} onChange={onSelectChange} />
            </Grid.Col>
        </Grid.Row>
    );
};
