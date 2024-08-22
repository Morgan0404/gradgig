
export default function Hero() {

    return(
       <section className="container my-16">
           <h1 className="text-4xl font-bold text-center">
               Find your next <br/> Graduate Job here
           </h1>
           <p className="text-center text-gray-700 mt-2">
           </p>
           <form className="flex gap-2 mt-4 max-w-md  mx-auto">
               <input
                   type = "search"
                   className="border border-gray-400 w-full py-2 px-3 rounded-md"
                   placeholder="Search phrase..."/>
               <button className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800  py-2 px-4 rounded-md ">Search</button>

           </form>
       </section>
    )
}