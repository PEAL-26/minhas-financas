import dayJS from 'dayjs';

import 'dayjs/locale/pt';
import * as relativeTime from 'dayjs/plugin/relativeTime';

dayJS.extend(relativeTime.default);
dayJS.locale('pt');

export const dayjs = dayJS;
