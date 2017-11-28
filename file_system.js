const fs = require('fs');
const getSize = require('get-folder-size');
const mysql = require('mysql');

function get_date(){
    let date = new Date();
    return date;
}

const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'rootroot',
    database : 'FileSystem'
});

conn.connect(function(err) {
    if (err) console.log(err);
    else
        console.log("Connected!");
});

function apdate_file(path_and_name_file='',file_name,data=''){
    fs.appendFile(path_and_name_file,data,(err)=>{
        if(err)
            console.log(err);
        console.log('Updates!');
    });
    let date = get_date();
    selectData(file_name,date,'File Updates');
}

function rename_file(path_and_first_name_file='',path_and_last_name_file=''){
    fs.rename(path_and_first_name_file,path_and_last_name_file,(err)=>{
        if(err)
            console.log(err);
        console.log('File Renamed');
    });
    let date = get_date();
    selectData(path_and_first_name_file,date,'file renamed!');
}

rename_file('public/folder1/files/hello.txt','public/folder1/files/hi.txt');

function create_file(path_and_name_file='',file_name,data='') {
    fs.appendFile(path_and_name_file,data,(err)=>{
        if(err)
        {
            console.log(err);
        }
        console.log('File Saved!');
    });
    let date = get_date();
    selectData(file_name,date,'file Saved');
}

create_file('public/folder1/files/hel_create.txt','hel_create.txt',"Barev!");

function del_file(path_file='',file_name){
    fs.unlink(path_file,err=>{
       if(err) {
           console.log(err);
       }
       console.log('File Deleted');
    });
    let date = get_date();
    selectData(file_name,date,"File Deleted!");
}

del_file('public/images/2.jpg','2.jpg');
console.log("file_name saved in mysql");

function create_directory(path_and_name_directory='',directory_name='') {
    fs.mkdir(path_and_name_directory,(err)=>{
        if(err)
        {
            console.log(err);
        }
        console.log("Directory created successfull");
    });
    let date = get_date();
    selectData(directory_name,date,"Directory created successfull");
}

create_directory('public/new_folder');

function file_size(path_and_name_file,file_name='') {
    getSize(path_and_name_file, function (err, size) {
        if (err) console.log(err);

        console.log(size + ' bytes');
        console.log((size / 1024 / 1024).toFixed(2) + ' Mb');
    });
    let date = get_date();
    selectData(file_name,date,"getting size obout file");
}

file_size('public/folder1/files/Hello.txt');

function info(path,file_name='') {
    fs.stat(path, (err, stats) => {
        console.log(path);
        console.log();
        console.log(stats);
        console.log();

        if (stats.isFile()) {
            console.log('    file');
        }
        if (stats.isDirectory()) {
            console.log('    directory');
        }
        console.log('    size: ' + stats["size"]);
        console.log('    mode1: ' + stats["mode"]);
        console.log('    others eXecute: ' + (stats["mode"] & 1 ? 'x' : '-'));
        console.log('    others Write:   ' + (stats["mode"] & 2 ? 'w' : '-'));
        console.log('    others Read:    ' + (stats["mode"] & 4 ? 'r' : '-'));

        console.log('    group eXecute:  ' + (stats["mode"] & 10 ? 'x' : '-'));
        console.log('    group Write:    ' + (stats["mode"] & 20 ? 'w' : '-'));
        console.log('    group Read:     ' + (stats["mode"] & 40 ? 'r' : '-'));

        console.log('    owner eXecute:  ' + (stats["mode"] & 100 ? 'x' : '-'));
        console.log('    owner Write:    ' + (stats["mode"] & 200 ? 'w' : '-'));
        console.log('    owner Read:     ' + (stats["mode"] & 400 ? 'r' : '-'));
    });
    let date = get_date();
    selectData(file_name,date,'/geting info obout file/');
}

info('public/folder1/files/Hello.txt');

function selectData(filename,date,action) {
    let employee = {filename: filename, date: date, action: action};
    conn.query('INSERT INTO filesystem SET?', employee, (err, res) => {
        if (err)
            console.log(err);
    });
}

module.exports.SELECT = selectData();
