export function formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        console.error('Invalid date string:', dateString);
        return 'Invalid date';
    }

    const dateOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };

    const formattedDate = date.toLocaleDateString('id-ID', dateOptions);
    const formattedTime = date.toLocaleTimeString('id-ID', timeOptions);
    const reformattedDate = formattedDate.replace(/\./g, '').replace(',', '');
    const reformattedTime = formattedTime.replace(':', '.');
    return `${reformattedTime}, ${reformattedDate}`;
}
