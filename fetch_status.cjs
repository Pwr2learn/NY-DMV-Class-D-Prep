const https = require('https');

https.get('https://api.github.com/repos/Pwr2learn/NY-DMV-Class-D-Prep/actions/runs', { headers: { 'User-Agent': 'Node.js' } }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const runs = JSON.parse(data);
        const lastRunId = runs.workflow_runs[0].id;
        console.log('Last Run ID:', lastRunId);
        
        https.get(`https://api.github.com/repos/Pwr2learn/NY-DMV-Class-D-Prep/actions/runs/${lastRunId}/jobs`, { headers: { 'User-Agent': 'Node.js' } }, (res2) => {
            let data2 = '';
            res2.on('data', chunk => data2 += chunk);
            res2.on('end', () => {
                const jobs = JSON.parse(data2);
                jobs.jobs.forEach(job => {
                    console.log(job.name, job.conclusion);
                    if (job.conclusion === 'failure') {
                        job.steps.forEach(step => {
                            if (step.conclusion === 'failure') {
                                console.log('Failed step:', step.name);
                            }
                        });
                    }
                });
            });
        });
    });
});
