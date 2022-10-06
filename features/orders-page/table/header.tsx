import * as React from 'react';
import cn from 'classnames';

import { Typography } from '@vtblife/uikit';

import styles from './styles.module.css';

const COLUMNS = ['Покупатель', '№ заявки', 'Жилой комплекс', 'Застройщик', 'Статус заявки'];

export const Header = () => (
    <div className={styles.wrapper}>
        <div className={cn([styles.title, styles.grid])}>
            {COLUMNS.map((name) => (
                <Typography key={name}>{name}</Typography>
            ))}
        </div>
    </div>
);
