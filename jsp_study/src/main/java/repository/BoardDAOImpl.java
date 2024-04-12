package repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import domain.BoardVO;
import orm.DatabaseBuilder;

public class BoardDAOImpl implements BoardDAO {
	
	
private static final Logger log=LoggerFactory.getLogger(BoardDAOImpl.class);

//db설정 mybatis lib 사용하여 db 구성
private SqlSession sql;

public BoardDAOImpl() {
	new DatabaseBuilder();
	sql=DatabaseBuilder.geFactory().openSession();
}
	
	
	
	
	//메서드 구현
	@Override
	public int insert(BoardVO bvo) {
		log.info("insert dao in!!");
		//실제 DB로 저장
		//sql.insert(mapperNameSpace.id,bvo);
		
		int isOk=sql.insert("BoardMapper.add", bvo);
		//insert,update,delete는 db가 변경되는 구분 반드시 commit 필요
		if(isOk>0) {
			sql.commit();
		}
		return isOk;
	}

	@Override
	public List<BoardVO> selectList() {
		log.info("selectList dao in!!");
		return sql.selectList("BoardMapper.list");
	}

	@Override
	public BoardVO selectone(int bno) {
		log.info("selecton dao in!!");
		return sql.selectOne("BoardMapper.detail",bno);
	}

	@Override
	public int updateone(BoardVO bvo) {
		log.info("update dao in!!");
		int isOk=sql.insert("BoardMapper.update",bvo);
		if(isOk>0) {
			sql.commit();
		}
		return isOk;
		
	}




	@Override
	public int deleteone(int bno) {
		log.info("deleteone dao in!!");
		int isOk=sql.delete("BoardMapper.delete",bno);
		if(isOk>0) {
			sql.commit();
		}
		return isOk;
		
	}

}