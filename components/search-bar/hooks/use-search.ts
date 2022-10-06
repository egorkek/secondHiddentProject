import { useCallback } from 'react';
import { useQueryParam, ArrayParam, StringParam } from 'use-query-params';

export const useSearch = (action: () => void) => {
    const [statusParam, setStatusParam] = useQueryParam('status', ArrayParam);
    const [searchParam, setSearchParam] = useQueryParam('search', StringParam);

    const onSubmitHandler = useCallback(
        (searchText: string, status: Array<string>) => {
            setSearchParam(searchText);
            setStatusParam(status);
            action();
        },
        [setSearchParam, setStatusParam, action],
    );

    return { statusParam, searchParam, onSubmitHandler };
};
