"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Express 모듈과 기타 필요한 모듈 가져오기
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
//Express 애플리케이션 생성
const app = (0, express_1.default)();
//포트 번호 설정, 기본값은 5000
const PORT = process.env.PORT || 5000;
//Todo 데이터를 저장할 JSON 파일 경로
const DATA_FILE = path_1.default.join(__dirname, "todos.json");
//JSON 형식의 요청 본문을 파싱하기 위해 body-parser 미들웨어 사용
app.use(body_parser_1.default.json());
//todos 데이터를 가져오는 API 엔드 포인트
//클라이언트로붙어의 get 요청을 처리
// todos.json 파일에서 todo 데이터를 읽어와 클라이언트에 응답
app.get("/api/todos", (req, res) => {
    //json 파일 읽어오기
    fs_1.default.readFile(DATA_FILE, (err, data) => {
        if (err) {
            // 에러발생시 500 상태코드와 에러 메시지를 전송
            return res.status(500).send("Error reading data file");
        }
        // 파일에서 읽은 데이터를 JSON 형식으로 파싱하여 클라이언트에 전송
        res.send(JSON.parse(data.toString()));
    });
});
//새로운 todo를 추가하는 api 엔드 포인트
//클라이언트로부터의 post 요청 처리
//요청 본문에 포함된 새 todo 데이터를 todos.json 파일에 추가
app.post("/api/todos", (req, res) => {
    //JSON 파일을 읽어옴
    fs_1.default.readFile(DATA_FILE, (err, data) => {
        if (err) {
            //에러 발생시 500+ 에러메시지
            return res.status(500).send("Error reading data file");
        }
        //파일에서 읽은 데이터를 JSON 형식으로 파싱
        const todos = JSON.parse(data.toString());
        // 새 todo 객체 생성
        const newTodo = Object.assign({ id: Date.now() }, req.body);
        todos.push(newTodo);
        //수정된 todo 배열을 다시 JSON 파일에 쓰기
        fs_1.default.writeFile(DATA_FILE, JSON.stringify(todos, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error writing data file");
            }
            //성공적으로 추가되면 201 상태 코드와 새 tood 데이터를 클라이언트에 전송
            res.status(201).send(newTodo);
        });
    });
});
/**
 * PUT /api/todos/:id
 * - 클라이언트로부터의 PUT 요청을 처리합니다.
 * - 특정 ID를 가진 Todo 데이터를 수정합니다.
 */
app.put("/api/todos/:id", (req, res) => {
    fs_1.default.readFile(DATA_FILE, (err, data) => {
        if (err) {
            return res.status(500).send("Error reading data file");
        }
        let todos = JSON.parse(data.toString());
        const updatedTodo = req.body;
        todos = todos.map((todo) => todo.id === parseInt(req.params.id, 10) ? updatedTodo : todo);
        fs_1.default.writeFile(DATA_FILE, JSON.stringify(todos, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error writing data file");
            }
            res.send(updatedTodo);
        });
    });
});
// Todo를 삭제하는 API 엔드포인트
app.delete("/api/todos/:id", (req, res) => {
    fs_1.default.readFile(DATA_FILE, (err, data) => {
        if (err) {
            return res.status(500).send("Error reading data file");
        }
        let todos = JSON.parse(data.toString());
        todos = todos.filter((todo) => todo.id !== parseInt(req.params.id, 10));
        fs_1.default.writeFile(DATA_FILE, JSON.stringify(todos, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error writing data file");
            }
            res.status(204).send();
        });
    });
});
//서버를 지정된 포트에서 실행
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
