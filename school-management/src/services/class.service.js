/*eslint-disable*/
import * as class1 from '@/json/class/class1'
import * as class2 from '@/json/class/class2'
import * as class3 from '@/json/class/class3'
import * as schools from '@/json/schools'
import * as students from '@/json/student/student'

let classes = [class1.default, class2.default, class3.default]
export const doFetchList = (() => {
    // GET method will be here to fetch all records
    let list = classes.filter((c) => {
        return schools.filter((school) => {
            if (school.id == c.school_id) {
                c.schoolName = school.name
            }
        })
    });
    return list;
})
export const doFetchSchoolList = (() => {
    // GET method will be here to fetch all records
    return schools.default;
})

export const doDeleteSelected = (({id}) => {
    // DELETE method will be here to fetch all records
    let list = classes.filter((c) => {
        if (id !== c.school_id) {
            return c;
        }
    });
    return list;
})

export const doPostOne = ((newRec) => {
    console.log(newRec);
})

export const doFetchOne = ((rec) => {
    let studentsList = students.default;
    let studs = rec.students? rec.students: [];
    let newStudents = []
    for(let i=0; i<studs.length; i++){
        for(let j=0; j<studentsList.length; j++){
            if(studs[i]==studentsList[j].id)
            {
                newStudents.push(studentsList[j]);
                break;
            }
        }
    }
    rec.studentsInfo = newStudents;
    return rec;
})

/*

export const doPatchOne = wrapRequest(({hub}) => {
    const requestOptions = {
        method: 'PATCH',
      headers: {
            'Content-Type': 'application/json', 'Accept': 'application/vnd.pgrst.object+json',
            'Prefer': 'return=representation', ...getHubAuthHeader(oakHubName)
        },
        body: JSON.stringify(hub)
    };
    return fetch(`${oakApiUrl}/hub?name=eq.${hub.name}`, requestOptions)
})
*/ 
