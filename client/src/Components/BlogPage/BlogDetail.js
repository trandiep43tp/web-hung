import React           from 'react';
import Moment          from 'react-moment';
import ReactHtmlParser from 'react-html-parser';
import { NavLink}      from 'react-router-dom';
import FormSerchName   from './FormSerchName_1';

function BlogDetail(props) {    
    const { blogsRecent, blog, history } = props;   
    let image = '';
    if(blog.images !== undefined){
        image = `uploads/blog/${blog.images[0]}`;
    }  
   
    return ( 
        <section className="ftco-section ftco-degree-bg">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 ftco-animate order-md-last">
                         <h2 className="mb-3">{ blog.name}</h2>
                        <div style={{fontWeight: 'bold', textAlign: 'justify'}} >{ ReactHtmlParser(blog.summary)}</div>
                        <p><img src= {image}  alt="" className="img-fluid" /> </p>
                        <div style= {{ fontWeight: 'bold', textAlign: 'justify'}}> { ReactHtmlParser(blog.content)}</div>                   
                        <div className="tag-widget post-tag-container mb-5 mt-5">
                            <div className="tagcloud">
                                <a href="/" className="tag-cloud-link">Life</a>
                                <a href="/" className="tag-cloud-link">Sport</a>
                                <a href="/" className="tag-cloud-link">Tech</a>
                                <a href="/" className="tag-cloud-link">Travel</a>
                            </div>
                        </div>
                        <div className="about-author d-flex p-4 bg-light">
                            <div className="bio align-self-md-center mr-4">
                                <img src="images/person_1.jpg" alt="" className="img-fluid mb-4" />
                            </div>
                            <div className="desc align-self-md-center">
                                <h3>Lance Smith</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus itaque, autem necessitatibus voluptate quod mollitia delectus aut, sunt placeat nam vero culpa sapiente consectetur similique, inventore eos fugit cupiditate numquam!</p>
                            </div>
                        </div>
                        <div className="pt-5 mt-5">
                            <h3 className="mb-5">6 Comments</h3>
                            <ul className="comment-list">
                                <li className="comment">
                                    <div className="vcard bio">
                                        <img src="images/person_1.jpg" alt="" />
                                    </div>
                                    <div className="comment-body">
                                        <h3>John Doe</h3>
                                        <div className="meta">Decmener 7, 2018 at 2:21pm</div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                                        <p><a href="/" className="reply">Reply</a></p>
                                    </div>
                                </li>
                                <li className="comment">
                                    <div className="vcard bio">
                                        <img src="images/person_1.jpg" alt="" />
                                    </div>
                                    <div className="comment-body">
                                        <h3>John Doe</h3>
                                        <div className="meta">Decmener 7, 2018 at 2:21pm</div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                                        <p><a href="/" className="reply">Reply</a></p>
                                    </div>
                                    <ul className="children">
                                        <li className="comment">
                                            <div className="vcard bio">
                                                <img src="images/person_1.jpg" alt="" />
                                            </div>
                                            <div className="comment-body">
                                                <h3>John Doe</h3>
                                                <div className="meta">Decmener 7, 2018 at 2:21pm</div>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                                                <p><a href="/" className="reply">Reply</a></p>
                                            </div>
                                            <ul className="children">
                                                <li className="comment">
                                                    <div className="vcard bio">
                                                        <img src="images/person_1.jpg" alt="" />
                                                    </div>
                                                    <div className="comment-body">
                                                        <h3>John Doe</h3>
                                                        <div className="meta">Decmener 7, 2018 at 2:21pm</div>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                                                        <p><a href="/" className="reply">Reply</a></p>
                                                    </div>
                                                    <ul className="children">
                                                        <li className="comment">
                                                            <div className="vcard bio">
                                                                <img src="images/person_1.jpg" alt="" />
                                                            </div>
                                                            <div className="comment-body">
                                                                <h3>John Doe</h3>
                                                                <div className="meta">Decmener 7, 2018 at 2:21pm</div>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                                                                <p><a href="/" className="reply">Reply</a></p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li className="comment">
                                    <div className="vcard bio">
                                        <img src="images/person_1.jpg" alt="" />
                                    </div>
                                    <div className="comment-body">
                                        <h3>John Doe</h3>
                                        <div className="meta">December 7, 2018 at 2:21pm</div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                                        <p><a href="/" className="reply">Reply</a></p>
                                    </div>
                                </li>
                            </ul>
                            {/* END comment-list */}
                            <div className="comment-form-wrap pt-5">
                                <h3 className="mb-5">Leave a comment</h3>
                                <form action="/" className="p-5 bg-light">
                                    <div className="form-group">
                                        <label htmlFor="name">Name *</label>
                                        <input type="text" className="form-control" id="name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email *</label>
                                        <input type="email" className="form-control" id="email" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="website">Website</label>
                                        <input type="url" className="form-control" id="website" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Message</label>
                                        <textarea name ="aa" id="message" cols={30} rows={10} className="form-control" defaultValue={""} />
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" defaultValue="Post Comment" className="btn py-3 px-4 btn-primary" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div> {/* .col-md-8 */}
                    <div className="col-lg-4 sidebar ftco-animate">
                        <div className="sidebar-box">
                            <FormSerchName history = {history} />                           
                        </div>                     
                        <div className="sidebar-box ftco-animate">
                            <h3>Recent Blog</h3>
                             { showBlogsRecent(blogsRecent)}                           
                        </div>
                        <div className="sidebar-box ftco-animate">
                            <h3>Tag Cloud</h3>
                            <div className="tagcloud">
                                <a href="/" className="tag-cloud-link">dish</a>
                                <a href="/" className="tag-cloud-link">menu</a>
                                <a href="/" className="tag-cloud-link">food</a>
                                <a href="/" className="tag-cloud-link">sweet</a>
                                <a href="/" className="tag-cloud-link">tasty</a>
                                <a href="/" className="tag-cloud-link">delicious</a>
                                <a href="/" className="tag-cloud-link">desserts</a>
                                <a href="/" className="tag-cloud-link">drinks</a>
                            </div>
                        </div>
                        <div className="sidebar-box ftco-animate">
                            <h3>Paragraph</h3>
                            <div>{ ReactHtmlParser(blog.summary)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const showBlogsRecent = (blogs) =>{
    let xhtml = null;
    if(blogs.length === 0) return null;
    xhtml = blogs.map((item, index) =>{
        return (
            <div className="block-21 mb-4 d-flex" key = {index}>
                <NavLink exact={true}  to={`{/blogs/detail/${item.slug}}`} className="blog-img mr-4" style={{ backgroundImage: `url(uploads/blog/${item.images[0]})` }}> </NavLink>                <div className="text">
                    <h3 className="heading">
                       <NavLink exact = {true} to = {`/blogs/detail/${item.slug}`} >{item.name}</NavLink>
                    </h3>
                    <div className="meta">
                        <div>
                            <NavLink to={`{/blogs/detail/${item.slug}}`}><span className="icon-calendar" />
                                    <Moment format="MMM Do YY">
                                        {item.created.time}
                                    </Moment>
                            </NavLink>
                        </div>
                        <div><NavLink to="/"><span className="icon-person" />{item.created.user_name}</NavLink></div>
                        <div><NavLink to="/"><span className="icon-chat" /> 19</NavLink></div>                       
                    </div>
                </div>
            </div>
        )
    })
    return xhtml;
}
export default BlogDetail;

