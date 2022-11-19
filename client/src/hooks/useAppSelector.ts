import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';

import type { AppState } from '@/redux/store';

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
