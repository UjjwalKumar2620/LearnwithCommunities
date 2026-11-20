// Home page script
document.addEventListener('DOMContentLoaded', () => {
    // Count stats from data
    const totalParticipants = participants.length;
    const withBadges = participants.filter(p => p.badges > 0).length;
    const milestone3 = participants.filter(p => p.milestone === 'Milestone 3').length;
    const totalBadges = participants.reduce((sum, p) => sum + p.badges, 0);

    // Animate counters
    animateCounter(document.querySelector('#totalParticipants .stat-number'), totalParticipants);
    animateCounter(document.querySelector('#activeLearners .stat-number'), withBadges);
    animateCounter(document.querySelector('#milestone3 .stat-number'), milestone3);
    animateCounter(document.querySelector('#totalBadges .stat-number'), totalBadges);
});

function animateCounter(element, target) {
    if (!element) return;
    let current = 0;
    const duration = 1500;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, stepTime);
}
