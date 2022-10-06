import React from 'react';

import { Input, Size } from '@vtblife/uikit';

interface IProps {
    value: string;
    onChange: (value: string) => void;
}

export const SearchInput = (props: IProps) => {
    const { value, onChange } = props;

    return (
        <Input
            placeholder="ФИО, номер заявки"
            value={value}
            onChange={onChange}
            dataTest="searchInput"
            size={Size.Small}
            fullWidth
        />
    );
};
