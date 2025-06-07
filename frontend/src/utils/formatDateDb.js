export function formatDateWithOffset(date) {
    const d = new Date(date);
    const pad = (n, z = 2) => ('00' + n).slice(-z);
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hour = pad(d.getHours());
    const min = pad(d.getMinutes());
    const sec = pad(d.getSeconds());
    const ms = ('00' + d.getMilliseconds()).slice(-3);

    // Lấy offset phút
    const offset = -d.getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';
    const offsetHour = pad(Math.floor(Math.abs(offset) / 60));
    const offsetMin = pad(Math.abs(offset) % 60);

    return `${year}-${month}-${day}T${hour}:${min}:${sec}.${ms}${sign}${offsetHour}:${offsetMin}`;
}