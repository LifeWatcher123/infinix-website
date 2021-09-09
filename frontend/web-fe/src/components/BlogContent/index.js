import { useEffect, useState } from "react";
import axios from "axios";
import { API_ROOT, NAVBAR_ID } from "../../constants";
import { Footer } from "../Footer";
import { BlockNavBar } from "../NavBars";
import parse, { attributesToProps, domToReact } from "html-react-parser";
import { Collapse } from "bootstrap";

const BlogContent = (props) => {
  const [blogData, setBlogData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://127.0.0.1:8000/wagtail-api/pages/${props.blogId}/`)
      .then((res) => {
        setBlogData({
          title: res.data.title,
          introduction: res.data.introduction,
          authors: res.data.blog_authors,
          published_date: res.data.published_date,
          album_image: res.data.album_image.url,
          body: res.data.body,
        });
      })
      .finally(props.loading.setDone(true));
  };

  return (
    <div>
      <BlockNavBar
        containerId={NAVBAR_ID}
        refProps={props.navBarRefProp}
        loading={props.loading}
      />
      <main className="container py-3">
        <div
          className="shadow p-4 p-md-5 mb-4 text-white rounded bg-dark"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(25,12,0,0.9485994226792279) 0%, rgba(25,12,0,0.7861344366848302) 62%, rgba(25,12,0,0.3351540445279675) 100%), " +
              `url(${
                API_ROOT +
                (typeof blogData !== "undefined" ? blogData.album_image : null)
              })`,
            backgroundSize: "cover",
          }}
        >
          <div className="col-md-6 px-0">
            <h1 className="display-4 fst-italic">
              {typeof blogData !== "undefined" ? blogData.title : null}
            </h1>
            <p className="lead my-3">
              {typeof blogData !== "undefined" ? blogData.introduction : null}
            </p>
            <p className="lead mb-0">
              <a href="#" className="text-white fw-bold">
                Continue reading...
              </a>
            </p>
          </div>
        </div>
        <div className="row g-5">
          <div className="col-md-9">
            {typeof blogData !== "undefined" ? (
              <BlogContentBody blogData={blogData} />
            ) : null}
          </div>
          <div className="col-md-3">
            <div className="sticky-side-section">
              <div className="p-4 mb-3 bg-light rounded">
                <h4 className="fst-italic">About</h4>
                <p className="mb-0">
                  Customize this section to tell your visitors a little bit
                  about your publication, writers, content, or something else
                  entirely. Totally up to you.
                </p>
              </div>
              <div className="p-4">
                <h4 className="fst-italic">Related Blogs</h4>
                <ol className="list-unstyled mb-0">
                  {}
                  <li>
                    <a href="#">Game 1</a>
                  </li>
                  <li>
                    <a href="#">Game 2</a>
                  </li>
                  <li>
                    <a href="#">Game 3</a>
                  </li>
                </ol>
              </div>
              <div className="p-4">
                <h4 className="fst-italic">Elsewhere</h4>
                <ol className="list-unstyled">
                  <li>
                    <a href="#">GitHub</a>
                  </li>
                  <li>
                    <a href="#">Twitter</a>
                  </li>
                  <li>
                    <a href="#">Facebook</a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
export default BlogContent;

const BlogContentBody = (props) => {
  return (
    <article className="blog-post px-3">
      <h2 className="blog-post-title">{props.blogData.title}</h2>
      <p className="blog-post-meta">
        {`${props.blogData.published_date} by `}
        <a href="#">{props.blogData.authors[0].author_name}</a>
      </p>
      {props.blogData.body.map((section) => {
        if (section.type == "heading")
          return <h4 key={section.id}>{section.value}</h4>;
        else if (section.type == "paragraph") {
          let output = parse(section.value, {
            replace: (domNode) => {
              if (domNode.attribs && domNode.name === "p") {
                return (
                  <p key={section.id} className="lh-lg">
                    {domToReact(domNode.children)}{" "}
                  </p>
                );
              }
            },
          });
          return output;
        }
      })}
      <hr />
      {props.blogData.body.map}
    </article>
  );
};
