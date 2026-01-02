aws s3 sync ./ s3://domain.yantratmika.com/ --delete 
aws cloudfront create-invalidation --distribution-id E2FD0WRAK12KB9 --paths "/*"