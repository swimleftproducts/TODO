import {modalConstants} from '../../constants/modalConstants'
export const behindScenes ={
    [modalConstants.pages.landing]:{
        [modalConstants.menu.general]:[
            "This is a simple and narrowly focused app. So, the landing page is also simple and concise. ",
            "A user is directed to 2 options, signup or signin",
            "For the blue box in the center of the page: first show a tagline, then have that fade into the signup and sign in links"
        ],
        [modalConstants.menu.frontEnd]:[
            "Top level App component uses react router to show the LandingPage component on the '/' route. Other top level components are Error, Loading and Modal (behind the scenes modal). The redux store is used to control showing these components ",
            "The isAuthenticated action creator is called in App with useEffect. If this action sets auth state to true, the user is routed to the Homepage component",
            "n/a"
        ],
        [modalConstants.menu.backEnd]:[
            "The is Authenticated action creator calls the /api/isauthenticated route. If the user had a valid sesion, then the api call returns a user object. The user object contains username, email, id, and todos and sets the auth value to true",
            "n/a",
            "nothing planned"
        ]
    },
    [modalConstants.pages.signin]:{
        [modalConstants.menu.general]:[
            "A centered box is used for the user email and password input. This riffs on the centered box used on the landing page and this theme of cented boxes for input is used throughout the site",
            "A user can enter email and pw to be authenticated",
            "Google OAuth or other authentication schemes could be used"

        ],
        [modalConstants.menu.frontEnd]:[
            "The App component shows the Login component on the /login route",
            "The login action creator is called on form submit. This action creator makes a backend call and either updates the store with auth:true and the user data, or shows the Error component with an error message",
            "Impliment forgoten email or pw functionality"
        ],
        [modalConstants.menu.backEnd]:[
            "The login action creator calls the /api/login route. The backend uses passport with the local strategy and a mongoDB session store for authenticating the user. The /login route checks if the email exists for a user, then checks the password against the hash and salt stored in the database. An error is returned if the credentials are bad",
            "The session store is only used for storing the user _id. If a user tries to use the website after their session expires, they are routed to the /login page.",
            "Create route to retreive a forgoten pw or email"
        ]
    },
    [modalConstants.pages.register]:{
        [modalConstants.menu.general]:[
            "This app does not require a lot of user info, so I do not ask for it. I want the user to get signed up as quickly as possible, so minimal fields are required",
            "A user provides their name, their email (for use as username) and a password. These values are used to create an account. Each new account is populated with a stock todo to to indicate how to use the app",
            "Let a user use the app before signing up. Then if they want to save their data, they would be prompted to register"
        ],
        [modalConstants.menu.frontEnd]:[
            "The Register componenet is shown on the /register route. Register renders the SignUpForm component. On validation error, the SignUpForm renders the TextError component",
            "Formik and Yup are used to control and validate the form in the SignUpForm component. The register action creator is used to make a call to /api/register. A succesful registration results in auth being set to true and a user object saved to the store",
            "The password is not hidden durrent typing and is not confirmed with a second field"
        ],
        [modalConstants.menu.backEnd]:[
            "The register action creator calls /api/register with the form data. The back end confirms that the user email is unique, creates a hash from password using the crypto library. On creation the user is saved to the cloud mongoDB. The new user object with a sample todo is returned to the client.",
            { userSchema: 
                {name:{
                "type":"String"
            },
            email:{
                "type":"String"
            },
            hash:{
                "type": "String"
            },
            salt:{
                "type":"String"
            },
            todos:[{
                "type":"mongoose.ObjectId",
                "ref":"Todo"
                }
            ]}},
            "n/a"
        ],
       
    },
    [modalConstants.pages.homepage]:{
        [modalConstants.menu.general]:[
            "On the main homepage, the user is shown all of their todos. Most of the screen space for each todo is an image. This is reflects the app's stance that images are more likely to get you to progress a todo item.",
            "A user can see all todos, has access to the upper nav bar (for account tasks) and lower nav bar (for todo tasks)",
            "Allow the user to split the screen into 2 or more 'boards' and then drag and drop todos into different boards"
        ],
        [modalConstants.menu.frontEnd]:[
            "The App component renders the Homepage component via a Router component at the /homepage route. A Higher Order Component (ProtectedRoute) is used to render Homepage only if auth:true in the store. Hompage always renders the TopNav and BottomNav components. The content shown in the main area is either TodoCardDashboard, or one of the editing menus, CreateNew, EditTodo,EditUser",
            "Component level state is used to control showing or hiding the various Homepage menus and for toggling the additional info version of each card",
            "n/a"
        ],
        [modalConstants.menu.backEnd]:[
            "Each of the menu options EditAccount (under username button), Create and Organize all call a backend route and are supplied either appropraite data, or an error message. Each todo is stored as a unique document in a Todos collection. The User document references all todos created by a given user.",
            {  title:{
                "type":"String"
            },
            type:{
                "type":"String"
            },
            numberSteps:{
                "type":"Number[]"
            },
            completeSteps:{
                "type":"Number"
            },
            imageUrl:{
                "type":"String"
            },
            details:{
               "type":"String"
           },
            created:{
                "type":"Date"
            },
            completed:{
                "type":" Boolean",
                "default": "false"
            }},
            "The todo could schema will be modified to include a list of what users have what permisions. This will enabling sharing of todos between different users with varying permisions"
        ]
    },
    [modalConstants.pages.detail]:{
        [modalConstants.menu.general]:[
            "Generally, a user knows what is involved with finishing a todo. What they really want to monitor is their progress. This is why only a title, and image and progress bar is shown by default. However in some cases a user may want to provide tags to categorize todos, or they may want to store additional info with the todo. The detail area provides an area for this info. ",
            "When a user clicks on a todo card, it expands to show additional content. This content includes a type and a larger information area.",
            "The user should be able to enter info into the type and more info fields and have the todo update."
        ],
        [modalConstants.menu.frontEnd]:[
            "The TodoCardDashBoard is the main component that shows either the TodoCard or TodoCardDetail components. A map function is used to interate over the user.todos array and populate the correct number of cards. If a todo card is clicked on the detailID state is set equal to the id that todo. The todo with that id is then displayed using the TodoCardDetail component. ",
            "Local state is used to control showing a card in the 'detail' state. Also, of note, when progressing the todo completion progress bar, the increase is completion is shown before the request to the back end to update the todo is made. This allows for a quicker response to the user.",
            "The TodoCard and TodoCardDetail component share a lot of code (top half of card). In the future these components should be reworked so that the TodoCardDetail component only includes only code for the detail area of the TodoCard"
        ],
        [modalConstants.menu.backEnd]:[
            "When the progress arrows are clicked, a call is made to /api/progress with parameters of :id and :direction. Parameters are used to update a matching document completeSteps field either up or down. ",
            "The api route logic currently finds the matching todo, checks that the user is not trying to progress or regess the todo past 0 or 100%, then calls findByIdAndUpdate to update the todo. Then the full user object is pulled and returned to the user.",
            "The existing api route touches the database more than necessary. The action creator and the api route could be reworked to only return a confirmation of success"
        ]
    },
    [modalConstants.pages.create]:{
        [modalConstants.menu.general]:[
            "The user requires the ability to create a new todo. The create new form hides the background to prevent any visual clutter durring the create a new Todo step. ",
            "The user can click on a single button to get to the create new form. Then a user can enter a title, type, #number of steps and details about a todo. Optionally a user may enter a photo. Clicking anywhere outside the todo will close the form",
            "It could be desirable to enable a user to create mulitple todos or linked todos. In either cases the form would need to be reworked to have these features. Also, user data is lost on closing before submission. This may not be desirable."
        ],
        [modalConstants.menu.frontEnd]:[
            "A Create component is shown. The CreateNew containes a CreateNewForm object. On clicking the create button, the Homepage component remvoes the  TodoDashboard component and replaces it with CreateNew.",
            "Showing the create form is controled with component level state in the Homepage component. The form is built using Formatik and Yup. On submit a CreateTodo action creator is called. This handles the api call for creating the new todo.",
            "The code integrating the Formatik form and the file upload uses local state. It may be possible to do a cleaner job of using Formatik for file upload."
        ],
        [modalConstants.menu.backEnd]:[
            "New todos are created with a call to /api/getpresignedUrl, then with a call to /api/create with a body containing the todo data. AWS S3 is used for storing the photos. The front end requests a presignedURL from the backend. This request returns a URL and a Key. The URL then uploads the image to the URL. The key is sent with the body to /api/create and is used to access the image in the future. ",
            "Image file location at AWS is saved on each todo under imageUrl. However, this locatin is only a relative path The full URL for use by the front end is created by a helper method before sending the todo information to the front end. This allows for changing the AWS bucket without modifying the todo colleciton",
            "n/a"
        ]
    },
    [modalConstants.pages.editTodo]:{
        [modalConstants.menu.general]:[
            "A user may need to modify or delete an existing todo. This fucnctionality is accessable via  a small gear icon on the upper right of each todo card.  ",
            "The user can edit any value that was entered during creation of the original todo. Image fields are prepopulated with to speed up editing the todo",
            "A user might want to view other todos while editing a specific todo. To do this, the edit menu could be rendered along side the TodoCards in the TodoCardDashboard."
        ],
        [modalConstants.menu.frontEnd]:[
            "An EditTodo component shows a EditTodoForm component. The EditTodo component is rendered based on component level state inside of Homepage. ",
            "Formatik is used to create and control the form. Inside of useEffect, the current todo values are pulled from state and set to setTodo state. The setTodo values are used to initialize the formik form.",
            "Occasionally, the formik component will through an error stating that a component is changing an uncontrolled input to a controlled input. The error does not affect the function of the form, but shiould be addressed"
        ],
        [modalConstants.menu.backEnd]:[
            "This componant calls /api/edit or /api/delete routes. The flow for image upload is the same as for creating a new todo; a call is made to /api/getPresignedUrl, the image is uploaded, then a key is attached to the body for the request to /api/edit.",
            "The the edit route uses a findOneByIdAndUpdate call to modify any changed values for a todo. On deleting, the api finds the image in the AWS bucket, delets the image, then finds the todo document, deletes that and then removes the reference to that todo from the relevant user document via $pull.",
            "The type field should show a list of all the types the user has created in the past. The distinct() query makes this easy to accomplish. "
        ]
    },
    [modalConstants.pages.editUser]:{
        [modalConstants.menu.general]:[
            "There is a single place to change all acount info.This menu is  the users name in the top nav.",
            "The user can change their name, email, and password for their todo account. The user can also delete their account from this menu",
            "Give a user a way to download a copy of all of their todos before deleting their account"
        ],
        [modalConstants.menu.frontEnd]:[
            "An EditAccount component shows a EditAccountForm component. The EditAccount component is rendered based on component level state inside of Homepage.",
            "Formatik is used to create and control the form. Yup is used to validate the email and password fields. isLoadingAction and isDoneLoadingAction action creators are used to show a loading bar durring axios requests. Also, any errors in api requests are shown by dispatching an error action creator that shows an error modal.",
            "n/a"
        ],
        [modalConstants.menu.backEnd]:[
            "This component calls /api/user/delete/:id or /api/user/edit. The delete route removes all user todos, images, and then the user from the database. The /api/user/edit route will either save a new email and name or generate and save a new has and salt based on the new use supplied password",
            "The CRUD functinoality here is the same as used elsewhere.",
            "The user pw should be hidden on typing. Also, it might be wise to require the current pw to be entered before allowing a password change."
        ]
    },
    [modalConstants.pages.organize]:{
        [modalConstants.menu.general]:[
            "Organizing the todos how the user wants may take a few tries. So the organize menu pops up over the bottom of the screen an remains until intentionally not shown.",
            "The user can organize todos by create date, completion status, type. They can also show all which is the default. Clicking on a button multiple times toggles between organizing in descending and descending orderi",
            "A user should be able to organize todos by percent complete. Currently organizing by completion only selects between completed and non-compleated todos, but does not organize by completion percent among non-completedtodos shown. "
        ],
        [modalConstants.menu.frontEnd]:[
            "The Organize component is shown based on component level state inside of the NavBottom component. ",
            "Clicking on a button the Organize component calls the organizeTodos action creator with 2 values. The id of the clicked button and a direction value of 1 or -1. The action creator uses these values to populate url params for the api request.",
            "An arrow should be added to the side of the button icon indicating whether the sorting is by ascending or descending order. Also type should be a drop down list from all types present in the user's todo list (rather than alphabetically)"
        ],
        [modalConstants.menu.backEnd]:[
            "The sort function uses a call to /api/todos/:method/:direction which returns an array of all todos sorted according to the :method in the :direction.",
            "The sort route uses a switch statement to run a different queru according the the :method. The sorted array image links are then converted to full ImageUrls with a helper function. The array is then returned to the client.  ",
            "Conceviably all of the sorting functionality could be done on the client side. This would reduce server costs"
        ]
    },

}