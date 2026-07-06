const https = require('https');

const REPO = 'Pwr2learn/NY-DMV-Class-D-Prep';

function get(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Node.js' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });
}

function getLog(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Node.js' } }, (res) => {
            if (res.statusCode === 302) {
                https.get(res.headers.location, (res2) => {
                    let data = '';
                    res2.on('data', chunk => data += chunk);
                    res2.on('end', () => resolve(data));
                }).on('error', reject);
            } else {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => resolve(data));
            }
        }).on('error', reject);
    });
}

async function run() {
    try {
        const runs = await get(`https://api.github.com/repos/${REPO}/actions/runs`);
        const lastRunId = runs.workflow_runs[0].id;
        console.log('Last Run ID:', lastRunId);
        
        const jobs = await get(`https://api.github.com/repos/${REPO}/actions/runs/${lastRunId}/jobs`);
        for (const job of jobs.jobs) {
            if (job.conclusion === 'failure') {
                for (const step of job.steps) {
                    if (step.conclusion === 'failure') {
                        console.log('Failed step:', step.name);
                        console.log('We cannot get step logs without auth if it is old, but we can try getting job log:');
                        try {
                            const log = await getLog(`https://api.github.com/repos/${REPO}/actions/jobs/${job.id}/logs`);
                            console.log('LOG:');
                            console.log(log.split('\n').slice(-30).join('\n'));
                        } catch (e) {
                            console.error('Could not get log:', e);
                        }
                    }
                }
            }
        }
    } catch (err) {
        console.error(err);
    }
}
run();
