import React from 'react';
import { useToggle } from 'react-use';
import { useQueryClient } from 'react-query';

import { DSDropdown as Dropdown, Button, Typography } from '@vtblife/uikit';
import type { MiddleofficeOrderWithActions } from '@vtblife/m2pro-api/axios-gen/middleoffice_order_service';

import { DropdownControl } from '~/components/dropdown-control';
import { orderService } from '~/services';
import { MIDDLE_ORDERS_QUERY } from '~/constants/query';

import styles from './styles.module.css';

interface IActionButtonProps {
    action: () => void;
    label: string;
    dataTest: string;
}
const ActionButton = ({ action, label, dataTest }: IActionButtonProps) => (
    <Button size="s" variant="transparent" onClick={action} dataTest={dataTest || 'quickActionButton'}>
        <Typography variant="secondary" color="black">
            {label}
        </Typography>
    </Button>
);

interface IQuickActionsProps {
    order: MiddleofficeOrderWithActions['order'];
    actions: MiddleofficeOrderWithActions['actions'];
}

// TODO delete later if no one using it [30.08.2022]
export const QuickActions = ({ order, actions }: IQuickActionsProps) => {
    const queryRequest = useQueryClient();
    const [on, toggle] = useToggle(false);

    const stopEventBubble = React.useCallback((event: React.MouseEvent<Element, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
    }, []);

    const onFix = React.useCallback(async () => {
        await orderService.fixOrder(order);
        queryRequest.invalidateQueries(MIDDLE_ORDERS_QUERY);
        toggle();
    }, [order, toggle, queryRequest]);

    const onDecline = React.useCallback(async () => {
        await orderService.declineOrderFixation(order);
        queryRequest.invalidateQueries(MIDDLE_ORDERS_QUERY);
        toggle();
    }, [order, toggle, queryRequest]);

    const isFixEnabled = React.useMemo(() => actions.find((action) => action.type === 'FIX_CLIENT'), [actions]);
    const isDeclineEnabled = React.useMemo(
        () => actions.find((action) => action.type === 'DECLINE_CLIENT_FIXATION'),
        [actions],
    );
    const isShowDropdown = React.useMemo(() => isFixEnabled || isDeclineEnabled, [isDeclineEnabled, isFixEnabled]);

    return (
        <div className={styles.quickAction} onClick={stopEventBubble}>
            {isShowDropdown && (
                <Dropdown>
                    <DropdownControl toggle={on} />
                    <Dropdown.Content padding={false} positioning="end">
                        <div className={styles.content}>
                            {isFixEnabled && (
                                <ActionButton label="Зафиксировано" action={onFix} dataTest="buttonFixOrder" />
                            )}
                            {isDeclineEnabled && (
                                <ActionButton label="Не уникальный" action={onDecline} dataTest="buttonDeclineOrder" />
                            )}
                        </div>
                    </Dropdown.Content>
                </Dropdown>
            )}
        </div>
    );
};
