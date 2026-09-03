// Validate and stage this existing static site; no framework or dependencies required.
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const pages = ['index.html','characters.html','comics.html','shop.html','about.html'];
let count=0;
for(const page of pages){
 const html = fs.readFileSync(path.join(root,page),'utf8');
 if(!html.includes('modern.css')) throw Error('Missing design stylesheet: '+page);
 if((html.match(/<h1\b/g)||[]).length!==1) throw Error('Expected one main heading: '+page);
 for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)){
  const link=match[1];
  if(/^(https?:|mailto:|tel:|data:)/.test(link)||link==='#')continue;
  const [file,anchor]=link.split('#');
  const target=path.join(root,file||page);
  if(!fs.existsSync(target))throw Error('Broken local link in '+page+': '+link);
  if(anchor&&target.endsWith('.html')&&!fs.readFileSync(target,'utf8').includes('id="'+anchor+'"'))throw Error('Missing anchor: '+link);
  count++;
 }
}
fs.mkdirSync(path.join(root,'dist'),{recursive:true});
for(const file of [...pages,'styles.css','modern.css','app.js'])fs.copyFileSync(path.join(root,file),path.join(root,'dist',file));
fs.cpSync(path.join(root,'images'),path.join(root,'dist/images'),{recursive:true});
console.log('Validated 5 pages and '+count+' local references. Static site staged in dist.');
