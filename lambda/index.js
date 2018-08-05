var fs = require('fs');
var SSH = require('simple-ssh');

module.exports.handler = (event, context, callback) => {

const bucket = event.Records[0].s3.bucket.name;
const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
const region = event.Records[0].awsRegion;
/* -- the s3 aws cli command to launch via ssh in your EC2 -- */
var s3FileCommand = 'aws s3 cp s3://' + bucket + '/' + key + ' ./' + key + ' --region ' + region;

/* -- create SSH object wit the credentials that you need to connect to your EC2 instance -- */
/* I think it's definetly not best practice to include your ec2 key like this**/
var ssh = new SSH({
    host: 'EC2-IP-ON-SAME-VPC',
    user: 'ec2-user',
    key: fs.readFileSync("key.pem")
});
/* -- execute SSH command -- */
ssh.exec('cd ./mdb-to-csv-s3-lambda-ec2').exec('./mdb-to-csv-s3-lambda-ec2/mdb2csv.sh', {
 out: console.log.bind(console),
    exit: function(code, stdout, stderr) {
     console.log('operation exited with code: ' + code);
     console.log('STDOUT from EC2:\n' + stdout);
     console.log('STDERR from EC2:\n' + stderr);
     context.succeed('Success!');
 }
}).start();
}

