import React, { useEffect } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';

import { unloadSentry } from '@vtblife/sentry';
import { MainWrapper } from '@vtblife/ninja-ui';

import { IAppProps } from '@super-deal/common';

import { NavigationProvider } from '~/navigation';
import { ToastNotifications } from '~/features/toast-notifications/toast-notifications';

import { configureSentry } from './infrastructure/sentry';
import { QueriesProvider } from './queries/query-provider';
import { StoreProvider } from './stores';

import styles from './style.module.css';
import 'react-toastify/dist/ReactToastify.css';
import '@vtblife/m2-pro/dist/index.css';

const App = (props: IAppProps) => {
    useEffect(() => {
        configureSentry();
        return unloadSentry;
    }, []);

    const { history, basePath, authInfo } = props;
    return (
        <QueriesProvider>
            <StoreProvider authInfo={authInfo}>
                <MainWrapper classname={styles.app}>
                    <NavigationProvider basePath={basePath} history={history}>
                        {({ routes }) => (
                            <Router history={history}>
                                <Switch>
                                    <Redirect exact from={basePath} to={routes.LANDING_ROUTE.route} />
                                    {Object.values(routes).map((r) => {
                                        return (
                                            <Route
                                                key={r.route}
                                                path={r.route}
                                                component={r.component}
                                                exact={r.exact}
                                            />
                                        );
                                    })}
                                    <Redirect path="*" to={routes.LANDING_ROUTE.route} />
                                </Switch>
                                <ToastNotifications />
                            </Router>
                        )}
                    </NavigationProvider>
                </MainWrapper>
            </StoreProvider>
        </QueriesProvider>
    );
};

export default App;
