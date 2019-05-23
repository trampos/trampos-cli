#!/usr/bin/env node

const tramposcli = require('commander');
const chalk = require('chalk');
const terminalLink = require('terminal-link');
const api = require('./lib/api');


tramposcli.option('-s, --skill <name>', `specify the programming language or software`)
// .option('-s, --salary [value]', `specify the minimum salary`)
// .option('--no-confidentials', 'disable confidential opportunities')
// .option('--no-hidden-salaries', 'disable hidden salaries')
.action( async () => {

    const { skill /*, salary */ } = tramposcli;
    const opportunities = await api.search(skill);

    console.log(`Mostrando vagas de ${skill}`, `\n`)

    opportunities.forEach(opportunity => {

        let where = "",
            company = chalk.grey("confidencial");

        if(opportunity.company){
            company = chalk.green(opportunity.company.name)
        }

        if(opportunity.city){
            where = `${opportunity.city} - ${opportunity.state}`
        }

        console.log(`${opportunity.id}\t`, `${opportunity.name}`)
        console.log(`\t`, `${company} - ${where}`)
        console.log(`\t`, terminalLink(opportunity.url, opportunity.url), `\n`);
    });
    
})

tramposcli.parse(process.argv) 