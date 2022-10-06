import * as React from 'react';

import type { useOrders } from '~/hooks/use-orders';
import { checkIsForwardRef } from '~/utils/check-is-forward-ref';

import { Card } from './card';
import { Header } from './header';

interface IClientsTableProps {
    data: ReturnType<typeof useOrders>['data'];
    triggerElementRef: (node: HTMLElement) => void;
}

export const OrdersTable = (props: IClientsTableProps) => {
    const { data, triggerElementRef } = props;

    return (
        <>
            <Header />
            {data.pages.map((page, pageIndex) =>
                page.orderList.map(({ order, actions }, clientIndex) => {
                    const isForwardRef = checkIsForwardRef({
                        allPagesLength: data.pages.length,
                        pageIndex,
                        itemsOnPageLength: page.orderList.length,
                        itemIndex: clientIndex,
                    });

                    return (
                        <Card
                            key={order.buyerParticipant.id}
                            order={order}
                            actions={actions}
                            triggerElementRef={isForwardRef && triggerElementRef}
                        />
                    );
                }),
            )}
        </>
    );
};
