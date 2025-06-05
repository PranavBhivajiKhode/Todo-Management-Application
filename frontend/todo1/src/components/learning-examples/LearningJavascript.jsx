const person = {
    name: 'Pranav Khode',
    address:{
        line1:'Baker Street',
        city:'London',
        country:'UK',
    },
    profiles:['twitter' , 'linkedin' , 'instagram'],
    printProfile: () => {
        person.profiles.map(
            profile => {
                console.log(profile)}
            )
    }
}


export default function LearningJavascript(){
    return (
        <>
            <div>{person.name}</div>
            <div>{person.address.city}</div>
            <div>{person.profiles[0]}</div>
            <div>{person.printProfile()}</div>
        </>
    )
}