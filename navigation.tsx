import React, { createContext, ReactNode, useContext } from 'react';
import urlcat from 'urlcat';
import { toast } from 'react-toastify';

import { BaseNavigation } from '@super-deal/common';

import { LandingPage } from '~/features/landing-page/landing-page';
import { OrdersPage } from '~/features/orders-page';

interface IRoute {
    route: string;
    component: React.FC<Record<string, unknown>>;
    exact?: boolean;
}

type TRoutesKeys = 'LANDING_ROUTE' | 'NOVOSTOYKI_ROUTE' | 'CLIENTS_ROUTE' | 'ORDERS_ROUTE' | 'ORDER_ROUTE';
type TRoutes = Record<TRoutesKeys, IRoute>;

class Navigation extends BaseNavigation {
    routes = {} as TRoutes;

    constructor(props: BaseNavigation) {
        super();
        const { basePath, history } = props;

        this.history = history;
        this.basePath = basePath;

        this.routes.LANDING_ROUTE = {
            route: `${basePath}/landing`,
            component: LandingPage,
        };
        this.routes.ORDERS_ROUTE = {
            route: `${basePath}/orders`,
            component: OrdersPage,
            exact: true,
        };
    }

    goBack = () => {
        this.history.goBack();
    };

    goto = (route: string, props = {}) => {
        this.history.push(urlcat(route, props));
    };
}

const NavigationContext = createContext<Navigation | null>(null);

interface INavigationProps extends BaseNavigation {
    children: ReactNode | ((props: Navigation) => any);
}

export const NavigationProvider = (props: INavigationProps) => {
    const { basePath, history, children } = props;

    const navigation = new Navigation({ basePath, history });

    navigation.history.listen(() => {
        toast.dismiss();
    });

    return (
        <NavigationContext.Provider value={navigation}>
            {typeof children === 'function' ? children(navigation) : children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    const navigation = useContext(NavigationContext);

    if (!navigation) {
        throw new Error('useNavigation must be called within a NavigationProvider');
    }

    return navigation;
};

export const useNavigationWithFallback = () => {
    const navigation = useContext(NavigationContext);

    if (!navigation) {
        return { basePath: '/m2-pro' };
    }

    return navigation;
};
