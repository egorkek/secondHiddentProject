import React from 'react';

import { DSSelect as Select, useMultipleSelect } from '@vtblife/uikit';

import { convertRecordToSelectOptions } from '@super-deal/utils';

import { TASK_STATUS_LABELS_REALTY } from '~/constants/status-labels';
import { TRequestStatus } from '~/models/request';

const statusOptions = convertRecordToSelectOptions(TASK_STATUS_LABELS_REALTY);

interface IStatusSelectProps {
    defaultStatuses: string[];
    onChange: (statuses: string[]) => void;
}

export const StatusSelect = (props: IStatusSelectProps) => {
    const { defaultStatuses, onChange } = props;
    const patchedOnChange = (values: Array<TRequestStatus>) => {
        onChange(values);
    };
    const { is, handleChange, selectedText } = useMultipleSelect<string>(patchedOnChange, {
        selected: defaultStatuses,
        texts: statusOptions,
    });

    return (
        <Select mode="multiple" onChange={handleChange}>
            <Select.Button size="s">{selectedText || 'Статус'}</Select.Button>
            <Select.Content>
                {statusOptions.map(({ value, text }, i) => (
                    <Select.Option
                        value={value}
                        key={value}
                        selected={is(value)}
                        divider={i === statusOptions.length - 1}
                    >
                        {text}
                    </Select.Option>
                ))}
            </Select.Content>
        </Select>
    );
};
