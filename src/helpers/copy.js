export default async function copy(value) {
    try {
        await navigator.clipboard.writeText(value);
        return true;
    } catch (error) {
        return false;
    }
};