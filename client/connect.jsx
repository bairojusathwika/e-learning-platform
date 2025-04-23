const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(user);
    const response = await fetch("http://localhost:5432/api/auth/register")
    method:"POST",
    headers:{
        "Content-Type":"application/json",
        },
        body: JSON.stringify(user),     

};

console.log(response);
