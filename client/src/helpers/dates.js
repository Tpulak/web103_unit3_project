const formatTime = (time) => {
    if (!time) return ''

    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours, 10)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12

    return `${hour12}:${minutes} ${ampm}`
}

const formatRemainingTime = (remaining) => {
    if (!remaining) return ''

    const target = new Date(remaining)
    const now = new Date()
    const diff = target - now

    const absDiff = Math.abs(diff)
    const days = Math.floor(absDiff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60))

    const prefix = diff < 0 ? 'Event passed ' : 'Starts in '

    if (days > 0) {
        return `${prefix}${days}d ${hours}h ${minutes}m`
    }

    if (hours > 0) {
        return `${prefix}${hours}h ${minutes}m`
    }

    return `${prefix}${minutes}m`
}

const formatNegativeTimeRemaining = (remainingText, eventId) => {
    const element = document.getElementById(`remaining-${eventId}`)

    if (element && remainingText.startsWith('Event passed')) {
        element.classList.add('negative-time-remaining')
    }
}

export default {
    formatTime,
    formatRemainingTime,
    formatNegativeTimeRemaining
}
