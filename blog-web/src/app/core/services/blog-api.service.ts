import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable  } from 'rxjs/Observable';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';


@Injectable({
  providedIn: 'root'
})
export class BlogApiService {
  private baseUrl = 'http://127.0.0.1:3000/';
  constructor(
    private http: HttpClient,
    private messageService: NzMessageService
  ) { }
  handleError(error: any, message?: any, option?: any) {
    this.messageService.error(message, option);
    return throwError(error);
  }

  upload(body): Observable<any> {
    return this.http.post(`${this.baseUrl}common/upload`, body).pipe(
      catchError((err) => this.handleError(err))
    );
  }

  /** User API */

  /**
   * Registered users
   * @params {
   *  username,
   *  password
   * }
   */

  register(body): Observable<any> {
    return this.http.post(`${this.baseUrl}user/register`, body).pipe(
      catchError((err) => this.handleError(err, 222))
    );
  }

  /**
   * Verify the user name is available
   * @params {
   *  username
   * }
   */
  verify_name(body): Observable<any> {
    return this.http.post(`${this.baseUrl}user/verify_name`, body).pipe(
      catchError((err) => this.handleError(err, 333))
    );
  }

/**
 * User Login
 * @params {
 *  username,
 *  password
 * }
 */
  login(body): Observable<any> {
    return this.http.post(`${this.baseUrl}user/login`, body).pipe(
      catchError(async (err) => this.handleError(err, 'get api is fail'))
    );
  }

/**
 * Reset Password
 * @params {
 *  old_password,
 *  new_password
 * }
 */
  reset_pwd(body): Observable<any> {
    return this.http.put(`${this.baseUrl}user/reset_pwd`, body).pipe(
      catchError(async (err) => this.handleError(err, 444))
    );
  }
/**
 * Get User Info
 * @params {
 *  ?id
 * }
 */
  getUserInfo(id?: any): Observable<any> {
    const uuid = id ? id : null;
    return this.http.get(`${this.baseUrl}user/get_user_info`, {params: {id: uuid} }).pipe(
      catchError(async (err) => this.handleError(err, 444))
    );
  }

/**
 * Get User All Info
 * @params {
 *  id
 * }
 */
getUserAllInfo(id): Observable<any> {
  return this.http.get(`${this.baseUrl}user/user_all_info`, {params: { id } }).pipe(
    catchError(async (err) => this.handleError(err, 444))
  );
}
/**
 * Update User Info
 * @params body {
 *    ?birthday,
 *    ?sex,
 *    ?identity,
 *    ?work,
 *    ?skill
 * }
 */
updateUserInfo(body): Observable<any> {
  return this.http.post(`${this.baseUrl}user/update_user_info`, body).pipe(
    catchError(async (err) => this.handleError(err, 444))
  );
}
   /** Article API */
  /***
   * @params {
   *  description: "按时吃"
   *  headImgUrl: "/upload/images/1608000808422-uzi.jpg"
   *  htmlStr: "<p>cs擦擦擦</p>↵"
   *  markDownStr: "cs擦擦擦"
   *  title: "sss"
   * }
   *
   */
  releaseArticle(body): Observable<any> {
    return this.http.post(`${this.baseUrl}article/release_article`, body).pipe(
      catchError(async (err) => this.handleError(err, 'get api is fail'))
    );
  }

  /**
   *
   * @params {
   *  page,
   *  category
   * }
   */
  getAllArticle(body): Observable<any> {
    console.log(body);
    return this.http.get(`${this.baseUrl}article/all_articles`, { params: body }).pipe(
      catchError(async (err) => this.handleError(err, 'get api is fail'))
    );
  }
  /**
   *
   * @params
   * id
   *
   */
  getArticleDetail(id): Observable<any> {
    return this.http.get(`${this.baseUrl}article/detail/${id}`).pipe(
      catchError(async (err) => this.handleError(err, 'get api is fail'))
    );
  }

/**
 *
 * @params id
 *
 * @params body{
 *  ?like,
 *  ?comment_count,
 *  ?star
 * }
 */
  updateArticleCount(id, body): Observable<any> {
    return this.http.post(`${this.baseUrl}article/detail/${id}`, body).pipe(
      catchError(async (err) => this.handleError(err, 'get api is fail'))
    );
  }

   /** Comment API */

  /***
   * @params {
   *
   *  ?user=id,
   *  ?topic_id=id
   * }
   *
   */

  getAllcomments(params): Observable<any> {
    return this.http.get(`${this.baseUrl}comment/all_comments/?${params}`).pipe(
      catchError(async (err) => this.handleError(err, 'get api is fail'))
    );
  }

    /***
   * @params {
   *
   *  topic_id
   *  author_id
   *  ? reply_level
   * ?comment_user_id
 *  ?reply_comment_id,
 *  ?parent_id
   * }
   *
   */

  pushOneComment(body): Observable<any> {
    return this.http.post(`${this.baseUrl}comment/release`, body).pipe(
      catchError(async (err) => this.handleError(err, 'get api is fail'))
    );
  }

   /** Digger API */

  /**
   *  digger
   *  @params body{
   *    articleInfo,
   *    from
   *  }
   */

  articleDigger(body): Observable<any> {
    return this.http.post(`${this.baseUrl}like/digger`, body).pipe(
      catchError(err => this.handleError(err, 'get Api is Err'))
    );
  }

     /** Collection API */
  /**
   *  digger
   *  @params body{
   *    articleInfo,
   *  }
   */

  articleCollection(body): Observable<any> {
    return this.http.post(`${this.baseUrl}collection/operation`, body).pipe(
      catchError(err => this.handleError(err, 'get Api is Err'))
    );
  }

  /** Tag Api */
  /**
   * create tag
   * @params {
   *   tag_category: String,
   *   tag_content: String,
   *   tag_color: String,
   *   tag_background: String,
   *   icon: String
   *  }
   *
   */

  createArticleTag(body): Observable<any> {
    return this.http.post(`${this.baseUrl}tag/create`, body).pipe(
      catchError(err => this.handleError(err, 'get Api is Err'))
    );
  }

  /**
   * get all tags
   *
   */

  getAllTags(): Observable<any> {
    return this.http.get(`${this.baseUrl}tag/all_tags`).pipe(
      catchError(err => this.handleError(err, 'get Api is Err'))
    );
  }

  /**
   * user add tags
   * @params: {
   *  tags: []
   * }
   */

  userAddTags(params): Observable<any> {
    return this.http.post(`${this.baseUrl}user/add_tags`, params).pipe(
      catchError(err => this.handleError(err, 'get Api is Err'))
    );
  }

  /**
   * user remove tags
   * @params: {
   *  tags: []
   * }
   */

  userRemoveTags(params): Observable<any> {
    return this.http.post(`${this.baseUrl}user/remove_tags`, params).pipe(
      catchError(err => this.handleError(err, 'get Api is Err'))
    );
  }

  /**
   * get User tags
   */

  getUserTags(id): Observable<any> {
    return this.http.get(`${this.baseUrl}user/user_tags/${id}`).pipe(
      catchError(err => this.handleError(err, 'get Api is Err'))
    );
  }


  /**
   * @params {
   *  url: ''
   * }
   */

  linkUrl(params): Observable<any> {
    return this.http.post(`${this.baseUrl}link/connect`, params).pipe(
      catchError(err => this.handleError(err, 'get Api is Err'))
    );
  }

  /** Dynamic */

  /**
   * params: {
   *  content,
   *  ?link_parse_content
   * }
   */

  publishDynamic(params): Observable<any> {
    return this.http.post(`${this.baseUrl}dynamic/publish`, params).pipe(
      catchError(err => this.handleError(err, 'get Api is Err'))
    );
  }

  getAllDynamics(): Observable<any> {
    return this.http.get(`${this.baseUrl}dynamic/all_dynamics`).pipe(
      catchError(err => this.handleError(err, 'get Api is Err'))
    );
  }

  /** Article Category */

  getArticleCategory(): Observable<any> {
    return this.http.get(`${this.baseUrl}article_classify/all`).pipe(
      catchError(err => this.handleError(err, 'get API is ERR'))
    );
  }


    /** Search By Content */

    /**
     *
     * @params body {
     *    query
     * }
     *
     */

    searchAll(body): Observable<any> {
      return this.http.post(`${this.baseUrl}search/`, body).pipe(
        catchError(err => this.handleError(err, 'get API is ERR'))
      );
    }
}
