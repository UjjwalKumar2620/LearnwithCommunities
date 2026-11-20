// Ranking page script
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchCount = document.getElementById('searchCount');
    const rankingBody = document.getElementById('rankingBody');
    const noResults = document.getElementById('noResults');
    const podiumSection = document.getElementById('podiumSection');
    const tableContainer = document.querySelector('.table-container');

    // Sort participants by skill badges descending, then alphabetically by name (case-insensitive)
    participants.sort((a, b) => {
        if (b.badges !== a.badges) {
            return b.badges - a.badges;
        }
        return a.name.trim().localeCompare(b.name.trim(), undefined, { sensitivity: 'base' });
    });

    // Assign sequential ranks: 1, 2, 3 ... 298
    participants.forEach((p, idx) => {
        p.rank = idx + 1;
    });

    // Set up podium
    setupPodium();

    // Render full table
    renderTable(participants);

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (!query) {
            podiumSection.style.display = '';
            renderTable(participants);
            searchCount.textContent = '';
            noResults.style.display = 'none';
            tableContainer.style.display = '';
            return;
        }

        const filtered = participants.filter(p =>
            p.name.toLowerCase().includes(query)
        );

        podiumSection.style.display = 'none';
        searchCount.textContent = filtered.length + ' found';

        if (filtered.length === 0) {
            noResults.style.display = '';
            tableContainer.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            tableContainer.style.display = '';
            renderTable(filtered);
        }
    });

    function setupPodium() {
        // Get top 3 unique badge counts
        const withBadges = participants.filter(p => p.badges > 0);
        if (withBadges.length === 0) {
            podiumSection.style.display = 'none';
            return;
        }

        const top3 = withBadges.slice(0, 3);
        
        if (top3[0]) {
            document.querySelector('#podium1 .podium-name').textContent = top3[0].name;
            document.querySelector('#podium1 .podium-badges').textContent = top3[0].badges + ' badges';
        }
        if (top3[1]) {
            document.querySelector('#podium2 .podium-name').textContent = top3[1].name;
            document.querySelector('#podium2 .podium-badges').textContent = top3[1].badges + ' badges';
        } else {
            document.getElementById('podium2').style.visibility = 'hidden';
        }
        if (top3[2]) {
            document.querySelector('#podium3 .podium-name').textContent = top3[2].name;
            document.querySelector('#podium3 .podium-badges').textContent = top3[2].badges + ' badges';
        } else {
            document.getElementById('podium3').style.visibility = 'hidden';
        }
    }

    function renderTable(data) {
        rankingBody.innerHTML = '';

        data.forEach((p) => {
            const tr = document.createElement('tr');

            // Rank
            const rankTd = document.createElement('td');
            rankTd.className = 'rank-cell';
            if (p.rank === 1) rankTd.innerHTML = '<span class="rank-medal">🥇</span>';
            else if (p.rank === 2) rankTd.innerHTML = '<span class="rank-medal">🥈</span>';
            else if (p.rank === 3) rankTd.innerHTML = '<span class="rank-medal">🥉</span>';
            else rankTd.textContent = '#' + p.rank;
            tr.appendChild(rankTd);

            // Name
            const nameTd = document.createElement('td');
            nameTd.className = 'participant-name';
            nameTd.textContent = p.name;
            tr.appendChild(nameTd);

            // Badges
            const badgeTd = document.createElement('td');
            const badgeSpan = document.createElement('span');
            badgeSpan.className = 'badge-count';
            if (p.badges >= 10) badgeSpan.classList.add('high');
            else if (p.badges >= 5) badgeSpan.classList.add('medium');
            else if (p.badges > 0) badgeSpan.classList.add('low');
            else badgeSpan.classList.add('zero');
            badgeSpan.textContent = p.badges + (p.badges === 1 ? ' badge' : ' badges');
            badgeTd.appendChild(badgeSpan);
            tr.appendChild(badgeTd);

            // Milestone
            const milestoneTd = document.createElement('td');
            if (p.milestone === 'Milestone 3') {
                milestoneTd.innerHTML = '<span class="milestone-tag milestone-3">⭐ Milestone 3</span>';
            } else if (p.milestone === 'Milestone 2') {
                milestoneTd.innerHTML = '<span class="milestone-tag milestone-2">🎯 Milestone 2</span>';
            } else {
                milestoneTd.innerHTML = '<span class="milestone-none">—</span>';
            }
            tr.appendChild(milestoneTd);

            // Profile
            const profileTd = document.createElement('td');
            if (p.profileUrl && p.profileUrl !== '') {
                const link = document.createElement('a');
                link.href = p.profileUrl;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.className = 'profile-link';
                link.innerHTML = 'View ↗';
                profileTd.appendChild(link);
            }
            tr.appendChild(profileTd);

            rankingBody.appendChild(tr);
        });
    }
});
