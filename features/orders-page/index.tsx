import React from 'react';

import { Loader } from '@super-deal/common';

import { useSearch, SearchBar } from '~/components/search-bar';
import { PageM2Pro } from '~/components/page-m2-pro';
import { useOrders } from '~/hooks/use-orders';

import { OrdersTable } from './table';

import styles from './styles.module.css';

const ORDERS_ON_PAGE = 10;

const Orders = () => {
    const queryParam = React.useMemo(() => ({ page: 0, size: ORDERS_ON_PAGE }), []);
    const { data, isLoading, error, ref } = useOrders(queryParam);

    if (error) return <span>Ошибка загрузки списка заявок</span>;

    const isDataEmpty = !data?.pages[0].orderList.length;
    const isShowLoader = isLoading && isDataEmpty;

    if (isDataEmpty && !isLoading) return <span>Список заявок пуст</span>;

    if (isShowLoader) return <Loader isWithoutPadding dataTest="clients_loader" />;

    return <OrdersTable data={data} triggerElementRef={ref} />;
};

export const OrdersPage = () => {
       const { statusParam, searchParam, onSubmitHandler } = useSearch();

    return (
        <PageM2Pro title="Заявки">
            <SearchBar
                onSubmitHandler={onSubmitHandler}
                defaultStatuses={statusParam}
                defaultSearchText={searchParam}
            />
            <div className={styles.page}>
                <Orders />
            </div>
        </PageM2Pro>
    );
};
