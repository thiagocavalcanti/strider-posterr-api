export function dateToUserFriendly(date: Date) {
    const options: any = { year: 'numeric', month: 'long', day: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date)
}