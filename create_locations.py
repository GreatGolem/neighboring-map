import json,os

data = [
    {
        'name' : 'Home',
        'latlng' : '',
        'description' : 'Home. Sweet home.'
    }, {
        'name' : 'Lab',
        'latlng' : '',
        'description' : 'The place I work.'
    }, {
        'name' : 'Payless',
        'latlng' : '',
        'description' : 'The closest supermarket to my home.'
    }, {
        'name' : 'Walmart',
        'latlng' : '',
        'description' : 'A larger supermarket close to my home.'
    }, {
        'name' : 'Purdue Memorial Union',
        'latlng' : '',
        'description' : 'Fulled with restaurants and other random facilities.'
    }, {
        'name' : 'Yichiban',
        'latlng' : '',
        'description' : 'Best Chinese restaurant in town.'
    }, {
        'name' : 'C&T Market',
        'latlng' : '',
        'description' : 'A small Chinese supermarket with nice meat and snack supply.'
    }
]

with open('locations.json','w') as f:
    json.dump(data,f)

print 'Model generated.\n'
