import * as schools from '@/json/schools'
import * as students from '@/json/student/student'

export const doFetchList = (() => {
    // GET method will be here to fetch all records
    return students.default;
})

export const doFetchSchoolList = (() => {
    // GET method will be here to fetch all records
    return schools;
})