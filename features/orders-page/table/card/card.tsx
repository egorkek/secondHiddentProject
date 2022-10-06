import React from 'react';
import cn from 'classnames';

import { Typography, Paper } from '@vtblife/uikit';
import type { MiddleofficeOrderWithActions } from '@vtblife/m2pro-api/axios-gen/middleoffice_order_service';

import { getFio } from '~/utils/get-fio';
import { OrdersBadge } from '~/components/badge';

import { useNavigation } from '~/navigation';

import { AssignedIcon } from '~/features/order-page/order-page';
import { useAuthStore } from '~/stores/auth-store';
import { getHasAssignedFlags } from '~/utils/order';

import styles from '../styles.module.css';

interface ICardProps {
    order: MiddleofficeOrderWithActions['order'];
    actions: MiddleofficeOrderWithActions['actions'];
    triggerElementRef?: (node: HTMLElement) => void;
}

export const Card = ({ order, actions, triggerElementRef }: ICardProps) => {
    const { basePath, goto } = useNavigation();
    const handleClick = (id: ICardProps['order']['id']) => () => goto(`${basePath}/orders/${id}`);
    const authStore = useAuthStore();
    const isMiddleOffice = authStore.isMiddleOffice();
    const { hasAssignedFlags, assigned } = getHasAssignedFlags(order.flags);
    return (
        <div className={styles.paper} data-test={`order-${order.number}`}>
            <Paper shadowLevel={1} roundLevel={1} isRounded={true}>
                <div className={styles.wrapperCard} ref={triggerElementRef || null} onClick={handleClick(order.id)}>
                    <div className={cn([styles.card, styles.grid])}>
                        <div className={styles.name}>
                            <Typography color="blue-500" variant="primary">
                                {getFio(order.buyerParticipant.person.name)}
                            </Typography>
                        </div>
                        <div>{order.number}</div>
                        <div>{order.apartmentComplex.name}</div>
                        <div>{order.developer.name}</div>
                        <div className={styles.badges}>
                            <OrdersBadge status={order.status} />
                            {isMiddleOffice && hasAssignedFlags && <AssignedIcon isAssigned={assigned} />}
                        </div>
                    </div>
                </div>
            </Paper>
        </div>
    );
};
